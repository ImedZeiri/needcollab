import { ENCRYPTION_SECRET } from '@/config/environment';

class EncryptionService {
  getTimeSlot(): number {
    return Math.floor(Date.now() / 60000);
  }

  getRandomSalt(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  generateKey(timeSlot: number, salt: string): string {
    return btoa(`${timeSlot}-${salt}-${ENCRYPTION_SECRET}`);
  }

  toBase64(str: string): string {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  fromBase64(str: string): string {
    const standard = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = standard + '=='.slice(0, (4 - (standard.length % 4)) % 4);
    return atob(padded);
  }

  xorCipher(text: string, key: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  encrypt(data: string, useDynamic = false): string {
    const timeSlot = this.getTimeSlot();
    const salt = useDynamic ? this.getRandomSalt() : '';
    const key = this.generateKey(timeSlot, salt);

    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    const encryptedBytes = new Uint8Array(dataBytes.length);
    for (let i = 0; i < dataBytes.length; i++) {
      encryptedBytes[i] = dataBytes[i] ^ key.charCodeAt(i % key.length);
    }

    let binaryStr = '';
    for (let i = 0; i < encryptedBytes.length; i++) {
      binaryStr += String.fromCharCode(encryptedBytes[i]);
    }

    const payload = useDynamic ? salt + '|' + binaryStr : binaryStr;
    return this.toBase64(payload);
  }

  decrypt(encrypted: string): string {
    const currentTimeSlot = this.getTimeSlot();

    for (let offset = 0; offset <= 2; offset++) {
      try {
        const timeSlot = currentTimeSlot - offset;
        const decoded = this.fromBase64(encrypted);

        if (decoded.includes('|')) {
          const pipeIndex = decoded.indexOf('|');
          const salt = decoded.slice(0, pipeIndex);
          const data = decoded.slice(pipeIndex + 1);
          const key = this.generateKey(timeSlot, salt);
          const decrypted = this.xorCipher(data, key);
          if (this.isValidJson(decrypted)) return decrypted;
        } else {
          const key = this.generateKey(timeSlot, '');
          const decrypted = this.xorCipher(decoded, key);
          if (this.isValidJson(decrypted)) return decrypted;
        }
      } catch {
        continue;
      }
    }

    return encrypted;
  }

  isValidJson(str: string): boolean {
    try {
      const trimmed = str.trim();
      if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) return false;
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }
}

export default new EncryptionService();
