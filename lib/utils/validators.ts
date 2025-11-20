/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate postal code (US and Canada)
 */
export const isValidPostalCode = (postalCode: string, country: string): boolean => {
  if (country.toLowerCase() === 'usa' || country.toLowerCase() === 'united states') {
    // US ZIP code format: 12345 or 12345-6789
    const usZipRegex = /^\d{5}(-\d{4})?$/;
    return usZipRegex.test(postalCode);
  } else if (country.toLowerCase() === 'canada') {
    // Canadian postal code format: A1A 1A1
    const canadaPostalRegex = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i;
    return canadaPostalRegex.test(postalCode);
  }

  // For other countries, just check that it's not empty
  return postalCode.trim().length > 0;
};

/**
 * Sanitize string input to prevent XSS
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};
