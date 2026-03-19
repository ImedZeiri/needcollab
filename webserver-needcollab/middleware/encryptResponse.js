/**
 * Middleware to encrypt all JSON responses
 * Compatible with the client-side EncryptionService
 */

function getTimeSlot() {
  return Math.floor(Date.now() / 60000);
}

function getRandomSalt() {
  return Math.random().toString(36).substring(2, 15);
}

function toBase64(str) {
  // Convert string to Buffer using 'binary' encoding to preserve raw bytes
  return Buffer.from(str, 'binary').toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function generateKey(timeSlot, salt) {
  // Generate the same key format as the client
  return Buffer.from(`${timeSlot}-${salt}-secret-key`).toString('base64');
}

function xorCipherToBytes(text, key) {
  // XOR cipher that returns a binary string (matching client implementation)
  let result = '';
  for (let i = 0; i < text.length; i++) {
    // XOR each character and convert back to character
    result += String.fromCharCode(
      (text.charCodeAt(i) & 0xFF) ^ (key.charCodeAt(i % key.length) & 0xFF)
    );
  }
  return result;
}

function encrypt(data) {
  const timeSlot = getTimeSlot();
  const salt = getRandomSalt();
  const key = generateKey(timeSlot, salt);
  
  // Encrypt the data using XOR cipher
  const encrypted = xorCipherToBytes(data, key);
  
  // Create payload: salt + '|' + encrypted binary data
  const payload = salt + '|' + encrypted;
  
  // Base64 encode the ENTIRE payload
  return toBase64(payload);
}


/**
 * Express middleware that intercepts res.json and encrypts the response
 * Response format: { encrypted: "base64-encoded-encrypted-data" }
 */
const encryptResponse = (req, res, next) => {
  // Store the original res.json function
  const originalJson = res.json.bind(res);
  
  // Override res.json
  res.json = function(data) {
    try {
      // Convert response data to JSON string
      const jsonString = JSON.stringify(data);
      
      // Encrypt the JSON string
      const encrypted = encrypt(jsonString);
      
      // Send encrypted response
      return originalJson({ encrypted });
    } catch (error) {
      console.error('Encryption error:', error);
      // If encryption fails, send original data (or error)
      return originalJson(data);
    }
  };
  
  next();
};

module.exports = encryptResponse;