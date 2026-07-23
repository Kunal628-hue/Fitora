/**
 * Fitora File Upload Validation & Security Utility
 * Provides defense-in-depth file type (MIME & Magic Bytes), size, and extension validation
 * to ensure no uploaded files can ever execute as code or compromise web root storage.
 */

// Max allowed file size (e.g., 5MB for avatar/image uploads)
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Allowed image MIME types and their corresponding magic byte signatures
export const ALLOWED_IMAGE_TYPES = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // 'RIFF' header
  'image/gif': [[0x47, 0x49, 0x46, 0x38]]   // 'GIF8' header
};

/**
 * Validates a file's size, MIME type, extension, and binary header magic bytes.
 * 
 * @param {File} file The candidate file object from input or drop event
 * @returns {Promise<{ valid: boolean, error?: string, sanitizedFileName?: string }>}
 */
export async function validateFileUpload(file) {
  if (!file || !(file instanceof File)) {
    return { valid: false, error: 'No valid file selected.' };
  }

  // 1. File Size Validation
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { 
      valid: false, 
      error: `File exceeds maximum allowed size of ${(MAX_FILE_SIZE_BYTES / (1024 * 1024)).toFixed(0)}MB.` 
    };
  }

  // 2. MIME Type & Extension Check
  const fileExt = (file.name.split('.').pop() || '').toLowerCase();
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  
  if (!allowedExtensions.includes(fileExt) || !ALLOWED_IMAGE_TYPES[file.type]) {
    return { 
      valid: false, 
      error: 'Invalid file type. Only JPG, PNG, WEBP, and GIF images are allowed.' 
    };
  }

  // 3. Binary Magic-Bytes Content Inspection (Prevents extension spoofing / polyglot code execution)
  try {
    const buffer = await file.slice(0, 16).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const expectedSignatures = ALLOWED_IMAGE_TYPES[file.type];

    const matchesMagicBytes = expectedSignatures.some(signature => 
      signature.every((byte, idx) => bytes[idx] === byte)
    );

    if (!matchesMagicBytes) {
      return { 
        valid: false, 
        error: 'File content verification failed. File header does not match declared type.' 
      };
    }
  } catch {
    return { valid: false, error: 'Unable to read file content for security validation.' };
  }

  // 4. Sanitized File Name (Prevents Directory Traversal & Code Injection in storage)
  const safeName = file.name
    .replace(/[^a-zA-Z0-9_.-]/g, '_')
    .replace(/\.{2,}/g, '.');

  return {
    valid: true,
    sanitizedFileName: `${Date.now()}_${safeName}`
  };
}
