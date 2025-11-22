const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const busboy = require('busboy');

// Configure directory for category images
const uploadsDir = '/tmp/category-images';

// Ensure uploads directory exists at startup
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed'
      })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Parse multipart form data using busboy (Netlify compatible)
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: false,
          error: 'Content-Type must be multipart/form-data'
        })
      };
    }

    const result = await new Promise((resolve, reject) => {
      const bb = busboy({ headers: { 'content-type': contentType } });
      let uploadedFile = null;
      let uploadError = null;

      bb.on('file', (fieldname, file, info) => {
        if (fieldname !== 'image') {
          file.resume(); // Skip this field
          return;
        }

        const { filename, mimeType } = info;
        const ext = path.extname(filename).toLowerCase();
        const allowedMimes = ['image/png', 'image/jpeg', 'image/webp'];
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];

        if (!allowedMimes.includes(mimeType) || !allowedExtensions.includes(ext)) {
          uploadError = new Error(`Invalid file type. Allowed types: PNG, JPEG, WebP`);
          file.resume();
          return;
        }

        const hash = crypto.randomBytes(8).toString('hex');
        const timestamp = Date.now();
        const savedFilename = `category-${timestamp}-${hash}${ext}`;
        const savePath = path.join(uploadsDir, savedFilename);

        const fileStream = fs.createWriteStream(savePath);
        let fileSize = 0;

        file.on('data', (chunk) => {
          fileSize += chunk.length;
          if (fileSize > 5 * 1024 * 1024) { // 5MB limit
            uploadError = new Error('File size exceeds 5MB limit');
            fileStream.destroy();
            try {
              fs.unlinkSync(savePath); // Clean up
            } catch (e) {
              // Ignore cleanup errors
            }
            file.resume();
            return;
          }
        });

        file.pipe(fileStream);

        fileStream.on('finish', () => {
          uploadedFile = {
            filename: savedFilename,
            originalname: filename,
            mimetype: mimeType,
            size: fileSize,
            filepath: `/category-images/${savedFilename}`
          };
        });

        fileStream.on('error', (err) => {
          uploadError = err;
        });
      });

      bb.on('finish', () => {
        if (uploadError) {
          reject(uploadError);
        } else if (!uploadedFile) {
          reject(new Error('No image file provided'));
        } else {
          resolve(uploadedFile);
        }
      });

      bb.on('error', (err) => {
        reject(err);
      });

      // Write the buffer to busboy - handle base64 encoding properly
      const buffer = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'binary');
      bb.end(buffer);
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        filename: result.filename,
        filepath: result.filepath
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    
    let statusCode = 500;
    let errorMessage = 'Server error during upload';

    if (error.message.includes('Invalid file type')) {
      statusCode = 400;
      errorMessage = error.message;
    } else if (error.message.includes('File size exceeds')) {
      statusCode = 413;
      errorMessage = error.message;
    } else if (error.message.includes('No image file provided')) {
      statusCode = 400;
      errorMessage = error.message;
    }

    return {
      statusCode: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: errorMessage
      })
    };
  }
};