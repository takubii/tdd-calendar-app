/**
 * データをローカルストレージに保存する
 * @param key - 保存するキー
 * @param data - 保存するデータ
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error(`Failed to save data to localStorage with key "${key}":`, error);
  }
}

/**
 * ローカルストレージからデータを読み込む
 * @param key - 読み込むキー
 * @param defaultValue - デフォルト値（データが存在しない場合）
 * @returns 読み込まれたデータまたはデフォルト値
 */
export function loadFromStorage<T>(key: string, defaultValue: T | null = null): T | null {
  try {
    const serializedData = localStorage.getItem(key);

    if (serializedData === null) {
      return defaultValue;
    }

    return JSON.parse(serializedData) as T;
  } catch (error) {
    console.error(`Failed to load data from localStorage with key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * ローカルストレージから指定したキーのデータを削除する
 * @param key - 削除するキー
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove data from localStorage with key "${key}":`, error);
  }
}

/**
 * ローカルストレージのすべてのデータを削除する
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}