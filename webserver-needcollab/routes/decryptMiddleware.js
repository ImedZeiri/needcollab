const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'secret-key';

function getTimeSlot() {
  return Math.floor(Date.now() / 60000);
}

function fromBase64(str) {
  const standard = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = standard + '=='.slice(0, (4 - standard.length % 4) % 4);
  return Buffer.from(padded, 'base64').toString('binary');
}

function generateKey(timeSlot, salt) {
  return Buffer.from(`${timeSlot}-${salt}-${ENCRYPTION_SECRET}`).toString('base64');
}

function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function tryDecrypt(encrypted, timeSlot) {
  const decoded = fromBase64(encrypted);
  if (decoded.includes('|')) {
    const pipeIndex = decoded.indexOf('|');
    const salt = decoded.slice(0, pipeIndex);
    const data = decoded.slice(pipeIndex + 1);
    const key = generateKey(timeSlot, salt);
    return xorCipher(data, key);
  }
  const key = generateKey(timeSlot, '');
  return xorCipher(decoded, key);
}

function decrypt(encrypted) {
  const currentSlot = getTimeSlot();
  // Try current slot and ±2 minutes to handle clock skew
  for (let offset = 0; offset <= 2; offset++) {
    try {
      const result = tryDecrypt(encrypted, currentSlot - offset);
      // Valid decrypted endpoint looks like "send-auth-email" or "needs?id=..."
      if (result && /^[a-zA-Z0-9_\-/?=&]+$/.test(result.trim())) {
        return result.trim();
      }
    } catch {
      continue;
    }
  }
  throw new Error('Failed to decrypt endpoint after trying multiple time slots');
}

function decryptEndpoint(req, res, next) {
  if (req.path.startsWith('/api/e/')) {
    try {
      const encryptedPath = req.path.slice(7);
      const decryptedPath = decrypt(encryptedPath);
      const queryString = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      req.url = '/api/' + decryptedPath + queryString;
      req.path = '/api/' + decryptedPath;
    } catch (error) {
      console.error('Decryption error:', error);
      return res.status(400).json({ error: 'Invalid encrypted endpoint', details: error.message });
    }
  }
  next();
}

module.exports = decryptEndpoint;
