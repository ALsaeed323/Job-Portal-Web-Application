import jwt from 'jsonwebtoken';

/**
 * Generate a secure JWT session token.
 * @param {Object} payload - The data to include in the JWT payload.
 * @param {string} secret - The secret key to sign the JWT.
 * @param {Object} options - Additional options like token expiry.
 * @returns {string} - The generated JWT token.
 */
function generateSessionToken(payload, secret, options = {}) {
  return jwt.sign(payload, secret, options);
}

export default generateSessionToken;
