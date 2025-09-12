/**
 * Simple authentication system with SHA-256 hashing
 */

// SHA-256 hash of password - password never stored in plain text
const VALID_PASSWORD_HASH = '72c0828d86f7867e9f4abfa21fd1d40a3a736d2db8edbc624daaf5548e2cc2d1';

/**
 * Simple SHA-256 implementation for client-side password hashing
 * @param {string} message - The message to hash
 * @returns {Promise<string>} - The SHA-256 hash as hex string
 */
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * Validate password against stored hash
 * @param {string} password - The password to validate
 * @returns {Promise<boolean>} - True if password is valid
 */
async function validatePassword(password) {
  try {
    const passwordHash = await sha256(password);
    return passwordHash === VALID_PASSWORD_HASH;
  } catch (error) {
    console.error('Password validation error:', error);
    return false;
  }
}

/**
 * Check if user is already authenticated
 * @returns {boolean} - True if authenticated
 */
function isAuthenticated() {
  return sessionStorage.getItem('chhota-pandit-auth') === 'true';
}

/**
 * Set authentication status
 * @param {boolean} authenticated - Authentication status
 */
function setAuthenticated(authenticated) {
  if (authenticated) {
    sessionStorage.setItem('chhota-pandit-auth', 'true');
  } else {
    sessionStorage.removeItem('chhota-pandit-auth');
  }
}

/**
 * Clear authentication (logout)
 */
function logout() {
  setAuthenticated(false);
  location.reload(); // Reload to show login screen
}

export { validatePassword, isAuthenticated, setAuthenticated, logout };
