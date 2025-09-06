// Validation utilities for forms

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex (same as backend)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

export function validateContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate required fields
  if (!data.name || !data.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters',
    });
  }

  if (!data.email || !data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  if (!data.message || !data.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.trim().length < 10) {
    errors.push({
      field: 'message',
      message: 'Message must be at least 10 characters',
    });
  }

  // Phone is required
  if (!data.phone || !data.phone.trim()) {
    errors.push({ field: 'phone', message: 'Phone is required' });
  } else {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
    if (!phoneRegex.test(data.phone.trim())) {
      errors.push({ field: 'phone', message: 'Invalid phone number format' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function getFieldError(
  errors: ValidationError[],
  field: string
): string | null {
  const error = errors.find((err) => err.field === field);
  return error ? error.message : null;
}
