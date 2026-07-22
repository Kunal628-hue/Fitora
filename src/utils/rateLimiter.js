/**
 * Central Configurable Rate Limiting Utility with Exponential Backoff
 * Supports Auth (per-IP & per-account with exponential backoff),
 * Public endpoints (moderate limits), and Authenticated endpoints (loose limits).
 */

// Default configurable thresholds
export const DEFAULT_RATE_LIMIT_CONFIG = {
  AUTH: {
    maxAttemptsPerWindow: 5,
    windowMs: 60 * 1000,          // 1 minute sliding window
    baseBackoffMs: 2000,          // 2 seconds initial backoff delay
    backoffMultiplier: 2,         // Exponential multiplier (2s -> 4s -> 8s -> 16s...)
    maxBackoffMs: 60 * 1000,      // Cap backoff at 60 seconds
  },
  PUBLIC: {
    maxRequestsPerWindow: 30,     // 30 requests per minute
    windowMs: 60 * 1000,
  },
  AUTHENTICATED: {
    maxRequestsPerWindow: 120,    // 120 requests per minute
    windowMs: 60 * 1000,
  },
};

// Active configuration (can be updated dynamically at runtime)
let activeConfig = JSON.parse(JSON.stringify(DEFAULT_RATE_LIMIT_CONFIG));

/**
 * Get current rate limit configuration
 */
export function getRateLimitConfig() {
  return JSON.parse(JSON.stringify(activeConfig));
}

/**
 * Update rate limit configuration dynamically
 * @param {Object} customConfig 
 */
export function updateRateLimitConfig(customConfig) {
  if (!customConfig || typeof customConfig !== 'object') return;
  activeConfig = {
    ...activeConfig,
    ...customConfig,
    AUTH: { ...activeConfig.AUTH, ...(customConfig.AUTH || {}) },
    PUBLIC: { ...activeConfig.PUBLIC, ...(customConfig.PUBLIC || {}) },
    AUTHENTICATED: { ...activeConfig.AUTHENTICATED, ...(customConfig.AUTHENTICATED || {}) },
  };
}

/**
 * Reset rate limit config to defaults
 */
export function resetRateLimitConfig() {
  activeConfig = JSON.parse(JSON.stringify(DEFAULT_RATE_LIMIT_CONFIG));
}

// Generate or retrieve persistent Client ID (simulates IP/Browser fingerprint)
function getClientIdentifier() {
  let clientId = localStorage.getItem('fitora_client_id');
  if (!clientId) {
    clientId = 'client_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    localStorage.setItem('fitora_client_id', clientId);
  }
  return clientId;
}

// Persistent Storage Key prefix
const STORAGE_PREFIX = 'fitora_ratelimit_';

function loadState(key) {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveState(key, state) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(state));
  } catch {}
}

/**
 * Check if an operation is allowed under rate limits
 * 
 * @param {'AUTH'|'PUBLIC'|'AUTHENTICATED'} category 
 * @param {string} [accountEmail] - Target email/account for AUTH checks
 * @param {string} [customClientKey] - Optional client identifier override
 * @returns {{ allowed: boolean, retryAfterSeconds: number, remaining: number, reason?: string }}
 */
export function checkRateLimit(category = 'PUBLIC', accountEmail = '', customClientKey = '') {
  const now = Date.now();
  const clientId = customClientKey || getClientIdentifier();
  const config = activeConfig[category] || activeConfig.PUBLIC;

  // ------------------------------------------------------------------------
  // 1. AUTH ROUTE RATE LIMITING (Per-IP/Client & Per-Account + Exponential Backoff)
  // ------------------------------------------------------------------------
  if (category === 'AUTH') {
    const authConfig = activeConfig.AUTH;
    const sanitizedEmail = accountEmail ? accountEmail.trim().toLowerCase() : '';

    // Check account-specific exponential backoff penalty
    if (sanitizedEmail) {
      const accountState = loadState(`account_${sanitizedEmail}`);
      if (accountState && accountState.blockedUntil && now < accountState.blockedUntil) {
        const retryAfterSeconds = Math.ceil((accountState.blockedUntil - now) / 1000);
        return {
          allowed: false,
          retryAfterSeconds,
          remaining: 0,
          reason: `Too many failed attempts for ${sanitizedEmail}. Please wait ${retryAfterSeconds}s.`,
        };
      }
    }

    // Check client IP/Device exponential backoff penalty
    const clientAuthState = loadState(`client_auth_${clientId}`);
    if (clientAuthState && clientAuthState.blockedUntil && now < clientAuthState.blockedUntil) {
      const retryAfterSeconds = Math.ceil((clientAuthState.blockedUntil - now) / 1000);
      return {
        allowed: false,
        retryAfterSeconds,
        remaining: 0,
        reason: `Too many authentication attempts from this device. Please wait ${retryAfterSeconds}s.`,
      };
    }

    // Check sliding window request count for Client IP
    const clientWindow = clientAuthState ? clientAuthState.attempts || [] : [];
    const validClientAttempts = clientWindow.filter(timestamp => now - timestamp < authConfig.windowMs);
    
    if (validClientAttempts.length >= authConfig.maxAttemptsPerWindow) {
      const oldestAttempt = Math.min(...validClientAttempts);
      const retryAfterSeconds = Math.ceil((oldestAttempt + authConfig.windowMs - now) / 1000);
      return {
        allowed: false,
        retryAfterSeconds,
        remaining: 0,
        reason: `Auth rate limit reached for this device. Please wait ${retryAfterSeconds}s.`,
      };
    }

    return {
      allowed: true,
      retryAfterSeconds: 0,
      remaining: authConfig.maxAttemptsPerWindow - validClientAttempts.length,
    };
  }

  // ------------------------------------------------------------------------
  // 2. PUBLIC & AUTHENTICATED ENDPOINTS (Sliding Window Token Bucket)
  // ------------------------------------------------------------------------
  const windowKey = `${category.toLowerCase()}_${clientId}`;
  const state = loadState(windowKey) || { requests: [] };
  
  // Filter timestamps within sliding window
  const validRequests = (state.requests || []).filter(timestamp => now - timestamp < config.windowMs);

  if (validRequests.length >= config.maxRequestsPerWindow) {
    const oldestRequest = Math.min(...validRequests);
    const retryAfterSeconds = Math.ceil((oldestRequest + config.windowMs - now) / 1000);
    return {
      allowed: false,
      retryAfterSeconds,
      remaining: 0,
      reason: `${category} endpoint rate limit exceeded. Please wait ${retryAfterSeconds}s.`,
    };
  }

  // Record this request
  validRequests.push(now);
  saveState(windowKey, { requests: validRequests });

  return {
    allowed: true,
    retryAfterSeconds: 0,
    remaining: config.maxRequestsPerWindow - validRequests.length,
  };
}

/**
 * Record a failed authentication attempt (calculates & applies exponential backoff)
 * 
 * @param {string} accountEmail 
 * @param {string} [customClientKey] 
 * @returns {number} Backoff delay in seconds
 */
export function recordAuthFailure(accountEmail = '', customClientKey = '') {
  const now = Date.now();
  const clientId = customClientKey || getClientIdentifier();
  const config = activeConfig.AUTH;

  const sanitizedEmail = accountEmail ? accountEmail.trim().toLowerCase() : '';

  // 1. Update Account Backoff State
  let accountBackoffSeconds = 0;
  if (sanitizedEmail) {
    const accountState = loadState(`account_${sanitizedEmail}`) || { failures: 0, blockedUntil: 0 };
    const failureCount = accountState.failures + 1;
    
    // Calculate exponential backoff delay: base * multiplier^(failures - 1)
    const backoffMs = Math.min(
      config.baseBackoffMs * Math.pow(config.backoffMultiplier, failureCount - 1),
      config.maxBackoffMs
    );

    const blockedUntil = now + backoffMs;
    accountBackoffSeconds = Math.ceil(backoffMs / 1000);

    saveState(`account_${sanitizedEmail}`, {
      failures: failureCount,
      blockedUntil,
      lastFailure: now,
    });
  }

  // 2. Update Client Device State
  const clientAuthState = loadState(`client_auth_${clientId}`) || { failures: 0, attempts: [], blockedUntil: 0 };
  const clientFailures = clientAuthState.failures + 1;
  const attempts = [...(clientAuthState.attempts || []).filter(t => now - t < config.windowMs), now];

  const clientBackoffMs = Math.min(
    config.baseBackoffMs * Math.pow(config.backoffMultiplier, clientFailures - 1),
    config.maxBackoffMs
  );

  saveState(`client_auth_${clientId}`, {
    failures: clientFailures,
    attempts,
    blockedUntil: now + clientBackoffMs,
    lastFailure: now,
  });

  return Math.max(accountBackoffSeconds, Math.ceil(clientBackoffMs / 1000));
}

/**
 * Record a successful authentication attempt (clears backoff penalties)
 * 
 * @param {string} accountEmail 
 * @param {string} [customClientKey] 
 */
export function recordAuthSuccess(accountEmail = '', customClientKey = '') {
  const clientId = customClientKey || getClientIdentifier();
  const sanitizedEmail = accountEmail ? accountEmail.trim().toLowerCase() : '';

  if (sanitizedEmail) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + `account_${sanitizedEmail}`);
    } catch {}
  }

  try {
    localStorage.removeItem(STORAGE_PREFIX + `client_auth_${clientId}`);
  } catch {}
}
