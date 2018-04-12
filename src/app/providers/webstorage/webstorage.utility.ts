
export class WebStorageUtility {
  static generateStorageKey(key: string): string {
    return `nws_${key}`
  }

  static get(storage: Storage, key: string): any {
    let storageKey = WebStorageUtility.generateStorageKey(key);
    let value = storage.getItem(storageKey);
    return WebStorageUtility.gettable(value);
  }

  static set(storage: Storage, key: string, value: any): any {
    let storageKey = WebStorageUtility.generateStorageKey(key);
    storage.setItem(storageKey, WebStorageUtility.settable(value));
  }

  static remove(storage: Storage, key: string): void {
    let storageKey = WebStorageUtility.generateStorageKey(key);
    storage.removeItem(storageKey);
  }

  static settable(value: string): string {
    return JSON.stringify(value);
  }

  static gettable(value: string): any {
    try {
      return JSON.parse(value);
    }
    catch (e) {
      return false;
    }
  }
}

let cache = {};

export let WebStorage = (webStorage: Storage, key: string) => {
  return (target: Object, propertyName: string): void => {
    key = key || propertyName;

    let storageKey = WebStorageUtility.generateStorageKey(key);
    let storedValue = WebStorageUtility.get(webStorage, key);

    Object.defineProperty(target, propertyName, {
      get: function () {
        return WebStorageUtility.get(webStorage, key);
      },
      set: function (value: any) {
        if (!cache[storageKey]) {
          if (storedValue === null) {
            WebStorageUtility.set(webStorage, key, value);
          }

          cache[storageKey] = true;
          return;
        }

        WebStorageUtility.set(webStorage, key, value);
      }
    });
  }
}

export function LocalStorage(key?: string) {
  return WebStorage(localStorage, key);
}

export function SessionStorage(key?: string) {
  return WebStorage(sessionStorage, key);
}