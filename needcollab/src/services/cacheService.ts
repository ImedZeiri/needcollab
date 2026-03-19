class CacheService {
  private db: IDBDatabase | null = null;
  private readonly DB_NAME = 'api-cache';
  private readonly STORE_NAME = 'cache';

  async init(): Promise<void> {
    if (this.db) return;
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => { this.db = request.result; resolve(); };
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'key' });
        }
      };
    });
  }

  async hashKey(key: string): Promise<string> {
    const data = new TextEncoder().encode(key);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async set(key: string, data: unknown, ttl = 300000): Promise<void> {
    await this.init();
    const hashedKey = await this.hashKey(key);
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([this.STORE_NAME], 'readwrite');
      const store = tx.objectStore(this.STORE_NAME);
      const req = store.put({ key: hashedKey, data, timestamp: Date.now(), ttl });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async get(key: string): Promise<unknown | null> {
    await this.init();
    const hashedKey = await this.hashKey(key);
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([this.STORE_NAME], 'readonly');
      const store = tx.objectStore(this.STORE_NAME);
      const req = store.get(hashedKey);
      req.onsuccess = () => {
        const entry = req.result;
        if (!entry) { resolve(null); return; }
        if (Date.now() - entry.timestamp > entry.ttl) { this.delete(key); resolve(null); return; }
        resolve(entry.data);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async delete(key: string): Promise<void> {
    await this.init();
    const hashedKey = await this.hashKey(key);
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([this.STORE_NAME], 'readwrite');
      const req = tx.objectStore(this.STORE_NAME).delete(hashedKey);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async clear(): Promise<void> {
    await this.init();
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction([this.STORE_NAME], 'readwrite');
      const req = tx.objectStore(this.STORE_NAME).clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}

export default new CacheService();
