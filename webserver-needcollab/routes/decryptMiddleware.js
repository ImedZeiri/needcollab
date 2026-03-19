function getTimeSlot() {
  return Math.floor(Date.now() / 60000);
}

function fromBase64(str) {
  const standard = str.replace(/-/g, '+').replace(/_/g, '/');
  const padded = standard + '=='.slice(0, (4 - standard.length % 4) % 4);
  return Buffer.from(padded, 'base64').toString('utf-8');
}

function generateKey(timeSlot, salt) {
  return Buffer.from(`${timeSlot}-${salt}-secret-key`).toString('base64');
}

function xorCipher(text, key) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return result;
}

function decrypt(encrypted) {
  const timeSlot = getTimeSlot();
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
