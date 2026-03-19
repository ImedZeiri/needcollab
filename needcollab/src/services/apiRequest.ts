import encryptionService from './encryptionService';
import cacheService from './cacheService';
import { API_URL, BEARER_TOKEN, API_KEY } from '@/config/environment';
import { ENCRYPTION_SECRET } from '@/config/environment';

function generateInternalToken(): string {
  const slot = Math.floor(Date.now() / 60000);
  const raw = `${slot}:${ENCRYPTION_SECRET}`;
  return btoa(raw);
}

class ApiRequestService {
  async request<T = unknown>(endpoint: string, options: RequestInit = {}, ttl = 300000): Promise<T> {
    const method = options.method || 'GET';
    const cacheKey = `${method}:${endpoint}:${JSON.stringify(options.body || '')}`;

    if (method === 'GET') {
      const cached = await cacheService.get(cacheKey);
      if (cached) return cached as T;
    }

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const encryptedEndpoint = encryptionService.encrypt(cleanEndpoint, true);
    const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const url = `${baseUrl}/e/${encryptedEndpoint}`;

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'apikey': API_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      'x-internal-token': generateInternalToken(),
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || 'API request failed');
    }

    const data = await response.json();
    const decryptedData = this.decryptResponse(data);

    if (method === 'GET') {
      await cacheService.set(cacheKey, decryptedData, ttl);
    }

    return decryptedData as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private decryptResponse(data: any): any {
    if (!data) return data;
    if (this.isEncryptedObject(data)) return this.decryptSingleObject(data);
    if (Array.isArray(data)) return data.map(item => this.isEncryptedObject(item) ? this.decryptSingleObject(item) : item);
    if (typeof data === 'object') {
      const result: Record<string, unknown> = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          result[key] = this.decryptResponse(data[key]);
        }
      }
      return result;
    }
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private isEncryptedObject(obj: any): boolean {
    return obj && typeof obj === 'object' && !Array.isArray(obj) && typeof obj.encrypted === 'string' && obj.encrypted.length > 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private decryptSingleObject(obj: any): any {
    try {
      return JSON.parse(encryptionService.decrypt(obj.encrypted));
    } catch {
      return obj;
    }
  }

  get<T = unknown>(endpoint: string, ttl?: number) { return this.request<T>(endpoint, { method: 'GET' }, ttl); }
  post<T = unknown>(endpoint: string, body: unknown) { return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }); }
  put<T = unknown>(endpoint: string, body: unknown) { return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }); }
  patch<T = unknown>(endpoint: string, body: unknown) { return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }); }
  del<T = unknown>(endpoint: string) { return this.request<T>(endpoint, { method: 'DELETE' }); }
}

export default new ApiRequestService();
