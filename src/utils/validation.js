/**
 * Strict Input Schema Validation Engine for Fitora
 * Validates type, length, numerical range, enums, and structural format.
 * Rejects invalid inputs immediately rather than sanitizing or truncating silently.
 */

export const SCHEMAS = {
  EMAIL: {
    type: 'string',
    minLength: 5,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Email must be a valid email address (5-100 characters).',
  },
  NAME: {
    type: 'string',
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]{2,50}$/,
    message: 'Name must be 2-50 characters containing only letters, spaces, hyphens, or apostrophes.',
  },
  PASSWORD: {
    type: 'string',
    minLength: 6,
    maxLength: 100,
    message: 'Password must be between 6 and 100 characters long.',
  },
  AGE: {
    type: 'integer',
    min: 1,
    max: 120,
    message: 'Age must be a whole number between 1 and 120.',
  },
  WEIGHT: {
    type: 'number',
    min: 20,
    max: 300,
    message: 'Weight must be a number between 20 and 300 kg.',
  },
  HEIGHT: {
    type: 'number',
    min: 1,
    max: 300, // Accepts height in feet (1-10) or cm (30-300)
    message: 'Height must be a number between 1 and 300.',
  },
  SLEEP: {
    type: 'number',
    min: 0,
    max: 24,
    message: 'Sleep duration must be a number between 0 and 24 hours.',
  },
  STEPS: {
    type: 'integer',
    min: 0,
    max: 100000,
    message: 'Step count must be a number between 0 and 100,000.',
  },
  PREFERENCE: {
    type: 'enum',
    allowedValues: ['veg', 'non'],
    message: 'Diet preference must be either "veg" or "non".',
  },
  GOAL: {
    type: 'enum',
    allowedValues: ['cut', 'bulk', 'maintain'],
    message: 'Fitness goal must be "cut", "bulk", or "maintain".',
  },
  EXTRA_PREFERENCES: {
    type: 'string',
    maxLength: 200,
    message: 'Extra preferences / notes must not exceed 200 characters.',
  },
  NOTE_TEXT: {
    type: 'string',
    minLength: 1,
    maxLength: 500,
    message: 'Daily training note must be between 1 and 500 characters.',
  },
  CHAT_MESSAGE: {
    type: 'string',
    minLength: 1,
    maxLength: 1000,
    message: 'Chat message must be between 1 and 1,000 characters.',
  },
  SEARCH_QUERY: {
    type: 'string',
    maxLength: 100,
    message: 'Search query must not exceed 100 characters.',
  },
};

/**
 * Validate a single value against a schema definition
 * 
 * @param {any} value 
 * @param {Object|string} schemaKeyOrSchema - Schema key from SCHEMAS or custom schema object
 * @returns {{ valid: boolean, error?: string, parsedValue?: any }}
 */
export function validateInput(value, schemaKeyOrSchema) {
  const schema = typeof schemaKeyOrSchema === 'string' ? SCHEMAS[schemaKeyOrSchema] : schemaKeyOrSchema;
  if (!schema) {
    return { valid: false, error: 'Unknown validation schema.' };
  }

  // 1. Type Validation
  if (schema.type === 'string') {
    if (typeof value !== 'string') {
      return { valid: false, error: schema.message || `Expected string, received ${typeof value}.` };
    }
    const strVal = value.trim();

    if (schema.minLength !== undefined && strVal.length < schema.minLength) {
      return { valid: false, error: schema.message || `Must be at least ${schema.minLength} characters long.` };
    }
    if (schema.maxLength !== undefined && strVal.length > schema.maxLength) {
      return { valid: false, error: schema.message || `Must not exceed ${schema.maxLength} characters.` };
    }
    if (schema.pattern && !schema.pattern.test(strVal)) {
      return { valid: false, error: schema.message || 'Invalid format.' };
    }

    return { valid: true, parsedValue: strVal };
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    const num = typeof value === 'number' ? value : parseFloat(value);

    if (isNaN(num) || !isFinite(num)) {
      return { valid: false, error: schema.message || 'Must be a valid finite number.' };
    }

    if (schema.type === 'integer' && !Number.isInteger(num)) {
      return { valid: false, error: schema.message || 'Must be a whole number (integer).' };
    }

    if (schema.min !== undefined && num < schema.min) {
      return { valid: false, error: schema.message || `Must be greater than or equal to ${schema.min}.` };
    }
    if (schema.max !== undefined && num > schema.max) {
      return { valid: false, error: schema.message || `Must be less than or equal to ${schema.max}.` };
    }

    return { valid: true, parsedValue: num };
  }

  if (schema.type === 'enum') {
    if (!schema.allowedValues.includes(value)) {
      return { valid: false, error: schema.message || `Value must be one of: ${schema.allowedValues.join(', ')}.` };
    }
    return { valid: true, parsedValue: value };
  }

  if (schema.type === 'boolean') {
    if (typeof value !== 'boolean') {
      return { valid: false, error: schema.message || 'Expected boolean value.' };
    }
    return { valid: true, parsedValue: value };
  }

  return { valid: false, error: 'Unsupported schema type.' };
}

/**
 * Validate full User Profile inputs
 * 
 * @param {Object} profile 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateProfile(profile) {
  const errors = [];

  if (!profile || typeof profile !== 'object') {
    return { valid: false, errors: ['Profile data must be an object.'] };
  }

  const fields = [
    { key: 'age', schema: 'AGE' },
    { key: 'weight', schema: 'WEIGHT' },
    { key: 'height', schema: 'HEIGHT' },
    { key: 'sleep', schema: 'SLEEP' },
    { key: 'steps', schema: 'STEPS', optional: true },
    { key: 'preference', schema: 'PREFERENCE' },
    { key: 'goal', schema: 'GOAL', optional: true },
    { key: 'extraPreferences', schema: 'EXTRA_PREFERENCES', optional: true },
  ];

  for (const field of fields) {
    const val = profile[field.key];
    if (field.optional && (val === undefined || val === null || val === '')) {
      continue;
    }
    const res = validateInput(val, field.schema);
    if (!res.valid) {
      errors.push(`${field.key}: ${res.error}`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate Auth Form data (Login, Signup, Reset Password)
 * 
 * @param {Object} formData 
 * @param {'login'|'signup'|'reset'} formType 
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateAuthForm(formData, formType) {
  if (!formData || typeof formData !== 'object') {
    return { valid: false, error: 'Form data must be provided.' };
  }

  // Email validation (All forms)
  const emailRes = validateInput(formData.email, 'EMAIL');
  if (!emailRes.valid) return emailRes;

  if (formType === 'reset') {
    return { valid: true };
  }

  // Password validation (Login & Signup)
  const passRes = validateInput(formData.password, 'PASSWORD');
  if (!passRes.valid) return passRes;

  if (formType === 'signup') {
    // Name validation
    const nameRes = validateInput(formData.name, 'NAME');
    if (!nameRes.valid) return nameRes;

    // Confirm password match
    if (formData.password !== formData.confirmPassword) {
      return { valid: false, error: 'Passwords do not match.' };
    }

    // Terms agreement check
    if (formData.agreed !== true) {
      return { valid: false, error: 'You must agree to the Terms & Conditions.' };
    }
  }

  return { valid: true };
}
