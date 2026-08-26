/**
 * JDC SOLAR 2.0 - SAFE STORAGE UTILITIES
 * Safe LocalStorage/SessionStorage wrapper with in-memory fallback
 */

class MemoryStorage {
  constructor() {
    this._data = new Map();
  }
  getItem(key) {
    return this._data.get(key) || null;
  }
  setItem(key, value) {
    this._data.set(key, String(value));
  }
  removeItem(key) {
    this._data.delete(key);
  }
}

function getStorage(type) {
  try {
    const storage = window[type];
    const testKey = '__jdc_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return storage;
  } catch (e) {
    return new MemoryStorage();
  }
}

export const safeStorage = {
  local: getStorage('localStorage'),
  session: getStorage('sessionStorage')
};
