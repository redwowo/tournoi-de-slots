const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');

const app = express();

// Set up JSON parsing middleware for non-multipart routes
app.use('/api', (req, res, next) => {
  // Log all API requests for debugging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  
  // Only apply express.json() for routes that aren't file uploads
  if (!req.url.includes('/upload-category-image')) {
    return express.json()(req, res, next);
  }
  next();
});

// Configure directory for category images
const uploadsDir = path.join(__dirname, 'category-images');

// Ensure uploads directory exists at startup
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Created category-images directory');
}

// Configure multer for category image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const ext = path.extname(file.originalname);
    const hash = crypto.randomBytes(8).toString('hex');
    const timestamp = Date.now();
    const filename = `category-${timestamp}-${hash}${ext}`;
    cb(null, filename);
  }
});

// File filter for allowed image types
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/png', 'image/jpeg', 'image/webp'];
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
  
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedMimes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: PNG, JPEG, WebP`), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

/**
 * POST /api/upload-category-image
 * 
 * Accepts multipart/form-data with a single 'image' field containing the category image.
 * 
 * Expected request:
 * - Field name: 'image'
 * - Allowed types: PNG, JPEG, WebP
 * - Max size: 5MB
 * 
 * Success response (200):
 * {
 *   "success": true,
 *   "filename": "category-1234567890-abc123def456.png",
 *   "filepath": "/category-images/category-1234567890-abc123def456.png"
 * }
 * 
 * Error responses:
 * - 400: Invalid file type or missing file
 * - 413: File size exceeds 5MB limit
 * - 500: Server error during upload
 */
app.post('/api/upload-category-image', (req, res, next) => {
  // CRITICAL: Set Content-Type first to guarantee JSON response
  res.setHeader('Content-Type', 'application/json');
  
  console.log('[UPLOAD] Received upload request');
  console.log('[UPLOAD] Request headers:', req.headers);
  console.log('[UPLOAD] Request method:', req.method);
  console.log('[UPLOAD] Request URL:', req.url);
  
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('[UPLOAD] Multer error:', err.code, err.message);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
          success: false,
          error: 'File size exceeds 5MB limit'
        });
      }
      return res.status(400).json({
        success: false,
        error: `Upload error: ${err.message}`
      });
    } else if (err) {
      console.error('[UPLOAD] Error:', err.message);
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    if (!req.file) {
      console.error('[UPLOAD] No file provided in request');
      console.log('[UPLOAD] Request body keys:', Object.keys(req.body || {}));
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }

    // Return success with public filepath
    const filepath = `/category-images/${req.file.filename}`;
    console.log('[UPLOAD] Success:', filepath);
    console.log('[UPLOAD] File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
    return res.json({
      success: true,
      filename: req.file.filename,
      filepath: filepath
    });
  });
});

/**
 * POST /api/delete-category-image
 * 
 * Deletes a previously uploaded category image file.
 * 
 * Expected request body:
 * {
 *   "filepath": "/category-images/category-1234567890-abc123def456.png"
 * }
 * 
 * Success response (200):
 * {
 *   "success": true,
 *   "message": "Image deleted successfully"
 * }
 * 
 * Error responses:
 * - 400: Invalid filepath or path traversal attempt
 * - 404: File not found
 * - 500: Server error during deletion
 */
app.post('/api/delete-category-image', (req, res) => {
  const { filepath } = req.body;

  if (!filepath) {
    return res.status(400).json({
      success: false,
      error: 'No filepath provided'
    });
  }

  // Prevent path traversal attacks
  const normalizedPath = path.normalize(filepath);
  if (normalizedPath.includes('..')) {
    return res.status(400).json({
      success: false,
      error: 'Invalid filepath'
    });
  }

  // Ensure file is in category-images directory
  const filename = path.basename(normalizedPath);
  const fullPath = path.join(uploadsDir, filename);

  if (!fullPath.startsWith(uploadsDir)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid filepath'
    });
  }

  // Delete the file
  fs.unlink(fullPath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({
          success: false,
          error: 'File not found'
        });
      }
      return res.status(500).json({
        success: false,
        error: 'Error deleting file'
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  });
});

// Redirige /tournois vers tournois.html (AVANT express.static)
app.get('/tournois', (req, res) => {
  res.sendFile(path.join(__dirname, 'tournois.html'));
});

// Route pour les tournois spécifiques (ex: /tournoi/s4emrt9h)
app.get('/tournoi/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Sert tous les fichiers statiques du dossier courant (APRÈS les routes spécifiques)
app.use(express.static(__dirname));

// (Optionnel) Redirige /accueil vers index.html si tu veux
app.get('/accueil', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
