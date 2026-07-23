/**
 * Fitora Error Sanitizer & Handler Utility
 * Ensures users never see stack traces, internal file paths, raw database schemas/errors,
 * or raw API payloads, while logging full error details for debugging.
 */

// Patterns that indicate internal stack traces, DB schemas, system paths, or raw technical errors
const SENSITIVE_PATTERNS = [
  /\/Users\//i,
  /\/home\//i,
  /node_modules/i,
  /file:\/\//i,
  /\.jsx?:\d+/i,
  /\.tsx?:\d+/i,
  /at\s+[\w.<>]+\s+\(/i,
  /PGRST/i,
  /postgresql/i,
  /postgres/i,
  /relation\s+"[^"]+"/i,
  /violates\s+.*constraint/i,
  /column\s+"[^"]+"/i,
  /SyntaxError/i,
  /TypeError/i,
  /ReferenceError/i,
  /Internal\s+Server\s+Error/i,
  /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/i, // JWT tokens
  /Bearer\s+[a-zA-Z0-9_-]+/i
];

const DEFAULT_FALLBACKS = {
  AUTH: 'Authentication failed. Please verify your credentials and try again.',
  DATABASE: 'Unable to sync your data right now. Your local changes are saved.',
  AI: 'Unable to generate AI content right now. Please check your connection and try again.',
  VALIDATION: 'Invalid input format. Please check your details and try again.',
  GENERAL: 'Something went wrong. Please try again.'
};

/**
 * Sanitizes an error message for end-user display while logging full details.
 * 
 * @param {Error|string|unknown} error The caught error object or string
 * @param {string} [customFallback] Custom fallback message if sanitized
 * @param {'AUTH'|'DATABASE'|'AI'|'VALIDATION'|'GENERAL'} [category='GENERAL'] Error category
 * @returns {string} Safe user-facing error message
 */
export function sanitizeErrorMessage(error, customFallback = null, category = 'GENERAL') {
  // Always log full error details for developer debugging
  console.error(`[Fitora ${category} Error]:`, error);

  if (!error) {
    return customFallback || DEFAULT_FALLBACKS[category] || DEFAULT_FALLBACKS.GENERAL;
  }

  const rawMsg = typeof error === 'string' 
    ? error 
    : (error.message || error.error_description || String(error));

  // Check if raw message contains sensitive trace/DB/system patterns
  const isSensitive = SENSITIVE_PATTERNS.some(pattern => pattern.test(rawMsg));

  if (isSensitive) {
    return customFallback || DEFAULT_FALLBACKS[category] || DEFAULT_FALLBACKS.GENERAL;
  }

  // Handle common known Supabase auth messages securely
  if (rawMsg.includes('Invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  if (rawMsg.includes('User already registered')) {
    return 'An account with this email already exists. Please log in.';
  }
  if (rawMsg.includes('Email not confirmed')) {
    return 'Please confirm your email address before logging in.';
  }

  // Return clean, safe raw message if free of sensitive patterns
  return rawMsg;
}
