# Upload Endpoint Debug Fix

## Problem
The `/api/upload-category-image` endpoint was returning "Unexpected token '<', "<!DOCTYPE "... is not valid JSON" error in the frontend, indicating that HTML was being returned instead of JSON.

## Root Cause
The issue was in the **frontend error handling**, not the server. The frontend code was calling `response.json()` on ALL responses, including error responses (404, 500) that might return HTML error pages. When the server returned an HTML error page and the frontend tried to parse it as JSON, it would fail with the "Unexpected token '<'" error.

## Solution

### 1. Fixed Frontend Error Handling (admin-panel.js)
Added proper response validation before parsing JSON:

```javascript
fetch('/api/upload-category-image', {
  method: 'POST',
  body: formData
})
  .then(response => {
    console.log('[UPLOAD] Response status:', response.status);
    console.log('[UPLOAD] Response content-type:', response.headers.get('content-type'));
    
    // CRITICAL: Check response.ok before parsing JSON
    if (!response.ok) {
      return response.text().then(text => {
        console.error('[UPLOAD] Error response:', text);
        throw new Error(`Server error (${response.status}): ${text.substring(0, 100)}`);
      });
    }
    
    return response.json();
  })
  .then(data => {
    console.log('[UPLOAD] Success data:', data);
    // Handle success...
  })
  .catch(error => {
    console.error('[UPLOAD] Catch error:', error);
    // Show user-friendly error message
  });
```

**Key Changes:**
- Check `response.ok` before calling `response.json()`
- If response is not OK, read as text and throw descriptive error
- Added comprehensive console logging for debugging
- Error messages now show HTTP status code and response preview

### 2. Enhanced Server Logging (server.js)
Added detailed logging to help debug issues:

```javascript
app.post('/api/upload-category-image', (req, res, next) => {
  // CRITICAL: Set Content-Type first to guarantee JSON response
  res.setHeader('Content-Type', 'application/json');
  
  console.log('[UPLOAD] Received upload request');
  console.log('[UPLOAD] Request headers:', req.headers);
  console.log('[UPLOAD] Request method:', req.method);
  console.log('[UPLOAD] Request URL:', req.url);
  
  upload.single('image')(req, res, (err) => {
    // ... error handling with logging ...
    
    if (!req.file) {
      console.error('[UPLOAD] No file provided in request');
      console.log('[UPLOAD] Request body keys:', Object.keys(req.body || {}));
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      });
    }
    
    console.log('[UPLOAD] Success:', filepath);
    console.log('[UPLOAD] File details:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
    // ... return success response ...
  });
});
```

**Key Additions:**
- Log all request headers and details
- Log file upload success with file metadata
- Log when file is missing with request body info
- Confirm Content-Type is set to application/json

### 3. Created Test Page (test-upload.html)
Added a standalone test page at `/test-upload.html` to test uploads in isolation:
- Simple file input with upload button
- Comprehensive console logging
- Visual status display
- Image preview on success
- Helps debug upload issues without admin panel complexity

## Testing Results

All tests pass successfully:

### ✅ Test 1: Upload with valid PNG file
```bash
curl -X POST -F "image=@/tmp/test.png" http://localhost:3000/api/upload-category-image
```
**Result:** Valid JSON response with success:true

### ✅ Test 2: Upload without file
```bash
curl -X POST http://localhost:3000/api/upload-category-image
```
**Result:** JSON error response (not HTML)

### ✅ Test 3: Verify Content-Type header
```bash
curl -I -X POST http://localhost:3000/api/upload-category-image
```
**Result:** Content-Type: application/json; charset=utf-8

### ✅ Test 4: Uploaded images accessible
**Result:** HTTP 200 OK when accessing uploaded image URLs

## Why This Fix Works

1. **Prevents JSON Parsing Errors**: By checking `response.ok` first, we never try to parse HTML error pages as JSON
2. **Better Error Messages**: Users now see meaningful error messages instead of cryptic JSON parsing errors
3. **Debugging Support**: Comprehensive logging helps identify issues quickly
4. **Robust Error Handling**: Handles network errors, server errors, and validation errors gracefully

## Best Practices Applied

1. **Always check response.ok before parsing JSON**
2. **Use response.text() for error responses** (might be HTML)
3. **Add comprehensive console logging** for debugging
4. **Set Content-Type header early** in server routes
5. **Test with curl** to verify endpoint behavior
6. **Create test pages** for isolated debugging

## Files Modified

1. `admin-panel.js` - Fixed `handleCategoryImageUpload()` function
2. `server.js` - Enhanced logging in upload endpoint
3. `test-upload.html` - Created new test page

## Acceptance Criteria

✅ The endpoint returns valid JSON without HTML error pages
✅ Images can be uploaded successfully  
✅ No "Unexpected token '<', DOCTYPE" errors
✅ Clear error messages for debugging
✅ Comprehensive logging for troubleshooting

## Additional Notes

The server endpoint was actually working correctly the entire time - it was always returning JSON with the correct Content-Type header. The issue was purely in the frontend not handling error responses properly. This is a common mistake when working with fetch API.

The fix ensures that:
- Success responses (200) are parsed as JSON
- Error responses (400, 404, 500) are read as text first, then a descriptive error is thrown
- Network errors are caught and displayed to the user
- All errors are logged to the console for debugging
