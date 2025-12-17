const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const crypto = require('crypto');

const {
  DEFAULT_ADMIN_SESSION_SECONDS,
  getAdminPanelCode,
  createAdminToken,
  verifyAdminToken,
  parseCookies,
  serializeCookie
} = require('./admin-token');

const app = express();
const apiRouter = express.Router();
const jsonParser = express.json();

// Log every API request and only parse JSON when needed
apiRouter.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

apiRouter.use((req, res, next) => {
  if (req.path.startsWith('/upload-category-image')) {
    return next();
  }
  return jsonParser(req, res, next);
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
apiRouter.post('/upload-category-image', (req, res, next) => {
  // CRITICAL: Set Content-Type first to guarantee JSON response
  res.setHeader('Content-Type', 'application/json');
  
  console.log('[UPLOAD] Received upload request');
  console.log('[UPLOAD] Request headers:', req.headers);
  console.log('[UPLOAD] Request method:', req.method);
  console.log('[UPLOAD] Request URL:', req.originalUrl);
  
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
apiRouter.post('/delete-category-image', (req, res) => {
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

function shouldUseSecureCookies(req) {
  return Boolean(
    req?.secure
      || req?.headers?.['x-forwarded-proto'] === 'https'
      || process.env.NODE_ENV === 'production'
  );
}

function setAdminAuthCookie(req, res, token, { maxAgeSeconds = DEFAULT_ADMIN_SESSION_SECONDS } = {}) {
  const cookie = serializeCookie('admin_token', token, {
    httpOnly: true,
    secure: shouldUseSecureCookies(req),
    sameSite: 'Strict',
    path: '/',
    maxAge: maxAgeSeconds
  });

  res.setHeader('Set-Cookie', cookie);
}

function clearAdminAuthCookie(req, res) {
  const cookie = serializeCookie('admin_token', '', {
    httpOnly: true,
    secure: shouldUseSecureCookies(req),
    sameSite: 'Strict',
    path: '/',
    expires: new Date(0),
    maxAge: 0
  });

  res.setHeader('Set-Cookie', cookie);
}

function getAdminTokenFromRequest(req) {
  const cookies = parseCookies(req.headers.cookie);
  return cookies.admin_token;
}

apiRouter.post('/admin/login', (req, res) => {
  const code = String(req.body?.code || '').trim();

  if (!code || code !== getAdminPanelCode()) {
    return res.status(401).json({
      success: false,
      error: 'Code incorrect'
    });
  }

  const { token, expiresAt, expiresInSeconds } = createAdminToken({
    expiresInSeconds: DEFAULT_ADMIN_SESSION_SECONDS
  });

  setAdminAuthCookie(req, res, token, { maxAgeSeconds: expiresInSeconds });

  return res.json({
    success: true,
    expiresAt
  });
});

apiRouter.post('/admin/verify', (req, res) => {
  const token = req.body?.token || getAdminTokenFromRequest(req);
  const result = verifyAdminToken(token);

  if (!result.valid) {
    return res.status(401).json({
      valid: false,
      reason: result.reason
    });
  }

  return res.json({
    valid: true,
    expiresAt: result.expiresAt
  });
});

apiRouter.post('/admin/logout', (req, res) => {
  clearAdminAuthCookie(req, res);

  return res.json({
    success: true
  });
});

app.use('/api', apiRouter);

// Redirige /tournois vers tournois.html (AVANT express.static)
app.get('/tournois', (req, res) => {
  res.sendFile(path.join(__dirname, 'tournois.html'));
});

// Redirige /spectate-tournoi vers spectate-tournoi.html (AVANT express.static)
app.get('/spectate-tournoi', (req, res) => {
  res.sendFile(path.join(__dirname, 'spectate-tournoi.html'));
});

// Route pour les tournois spécifiques (ex: /tournoi/s4emrt9h)
app.get('/tournoi/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'tournoi.html'));
});

// Route pour les bonus hunts spectateurs (ex: /bonus-hunt/bh_123456)
app.get('/bonus-hunt/:sessionId', (req, res) => {
  res.sendFile(path.join(__dirname, 'bonus-hunt-spectator.html'));
});

// Protège l'accès au panel admin côté serveur (utile si JS est désactivé)
app.get('/admin-panel.html', (req, res) => {
  const token = getAdminTokenFromRequest(req);
  const result = verifyAdminToken(token);

  if (!result.valid) {
    return res.redirect('/admin-login.html?next=/admin-panel.html');
  }

  return res.sendFile(path.join(__dirname, 'admin-panel.html'));
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
