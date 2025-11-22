# Netlify Functions Migration

## Problem
The original application was an Express server that needed to run on Netlify, which is a static hosting platform. The `/api/upload-category-image` route was returning 404 because Netlify couldn't run the Express server.

## Solution
Converted the upload and delete functionality to Netlify Functions.

## Changes Made

### 1. Created Netlify Functions
- `netlify/functions/upload-category-image.js` - Handles image uploads
- `netlify/functions/delete-category-image.js` - Handles image deletion

### 2. Updated Configuration
- Created `netlify.toml` with proper function routing
- Updated `_redirects` to include API routes
- Added `busboy` dependency for multipart form handling

### 3. Key Features
- **File Upload**: Supports PNG, JPEG, WebP images up to 5MB
- **File Validation**: Proper MIME type and extension checking
- **CORS Support**: Headers configured for cross-origin requests
- **Error Handling**: Comprehensive error responses with appropriate status codes
- **Security**: Path traversal protection and file type validation

### 4. Function Details

#### Upload Function (`upload-category-image.js`)
- Accepts POST requests with multipart/form-data
- Expects an 'image' field containing the file
- Returns JSON response with success status and file information
- Files are stored in `/tmp/category-images/` (Netlify function environment)

#### Delete Function (`delete-category-image.js`)
- Accepts POST requests with JSON body containing `filepath`
- Validates filepath to prevent directory traversal
- Deletes files from `/tmp/category-images/`
- Returns JSON response with success status

## Deployment Notes
1. The functions will be automatically deployed by Netlify
2. API routes are redirected from `/api/*` to `/.netlify/functions/*`
3. Client-side code requires no changes - it continues to use `/api/upload-category-image`
4. Files are stored temporarily in the Netlify function environment

## Testing
After deployment, test the upload functionality through the admin panel. The function should:
- Accept valid image files
- Return success response with file path
- Display uploaded image in the preview
- Handle errors appropriately (invalid file types, size limits, etc.)