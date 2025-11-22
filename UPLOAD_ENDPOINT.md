# Category Image Upload Endpoint Documentation

## Overview

The upload endpoint allows the admin panel to upload category images. Images are processed, validated, and stored in a dedicated directory on the server.

## Upload Endpoint

### POST `/api/upload-category-image`

Accepts a multipart/form-data request containing a single image file for a category.

#### Request

- **Method**: POST
- **Content-Type**: multipart/form-data
- **Field Name**: `image` (required)

#### Request Validation

The following validations are enforced:

- **File Types**: PNG, JPEG, WebP (checked by MIME type and file extension)
- **File Size**: Maximum 5MB
- **Field Name**: Must be named `image`

#### Success Response (HTTP 200)

```json
{
  "success": true,
  "filename": "category-1763834981632-17e54e83fe958678.png",
  "filepath": "/category-images/category-1763834981632-17e54e83fe958678.png"
}
```

**Response Fields:**
- `success` (boolean): True if upload was successful
- `filename` (string): Generated filename with unique hash and timestamp
- `filepath` (string): Public path to access the uploaded image

#### Error Responses

**Missing File (HTTP 400)**

```json
{
  "success": false,
  "error": "No image file provided"
}
```

**Invalid File Type (HTTP 400)**

```json
{
  "success": false,
  "error": "Invalid file type. Allowed types: PNG, JPEG, WebP"
}
```

**File Size Exceeded (HTTP 413)**

```json
{
  "success": false,
  "error": "File size exceeds 5MB limit"
}
```

**Upload Error (HTTP 400)**

```json
{
  "success": false,
  "error": "Upload error: [error message]"
}
```

## Delete Endpoint

### POST `/api/delete-category-image`

Deletes a previously uploaded category image.

#### Request

- **Method**: POST
- **Content-Type**: application/json

#### Request Body

```json
{
  "filepath": "/category-images/category-1763834981632-17e54e83fe958678.png"
}
```

#### Success Response (HTTP 200)

```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

#### Error Responses

**Missing Filepath (HTTP 400)**

```json
{
  "success": false,
  "error": "No filepath provided"
}
```

**Invalid or Unsafe Filepath (HTTP 400)**

```json
{
  "success": false,
  "error": "Invalid filepath"
}
```

The endpoint prevents path traversal attacks by:
- Checking for `..` in the normalized path
- Verifying the file path is within the category-images directory
- Using only the filename from the provided path

**File Not Found (HTTP 404)**

```json
{
  "success": false,
  "error": "File not found"
}
```

**Server Error (HTTP 500)**

```json
{
  "success": false,
  "error": "Error deleting file"
}
```

## Storage

- **Directory**: `/category-images/` (created automatically at server startup)
- **Filename Pattern**: `category-{timestamp}-{randomhash}.{ext}`
  - `timestamp`: Unix millisecond timestamp
  - `randomhash`: 16-character random hex string
  - `ext`: Original file extension (png, jpg, jpeg, webp)

## Example Usage

### Upload using cURL

```bash
curl -X POST -F "image=@/path/to/image.png" http://localhost:3000/api/upload-category-image
```

### Upload using JavaScript (Fetch API)

```javascript
const fileInput = document.getElementById('imageInput');
const file = fileInput.files[0];

const formData = new FormData();
formData.append('image', file);

fetch('/api/upload-category-image', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Image uploaded:', data.filepath);
    } else {
      console.error('Upload failed:', data.error);
    }
  });
```

### Delete using JavaScript

```javascript
const filepath = '/category-images/category-1763834981632-17e54e83fe958678.png';

fetch('/api/delete-category-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ filepath })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('Image deleted');
    } else {
      console.error('Delete failed:', data.error);
    }
  });
```

## Integration

The admin panel integrates with this endpoint in `admin-panel.js`:

- **Upload Handler**: `handleCategoryImageUpload(event, type)`
- **Frontend Storage**: Category images are stored with category metadata in localStorage
- **Preview**: Uploaded images are displayed in the category form before saving

## Security

- File type validation by MIME type and extension
- File size limits (5MB)
- Path traversal attack prevention
- Unique filename generation prevents collisions and overwriting
- Uploaded files are served as static files through Express
