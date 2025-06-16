import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveToStorage, loadFromStorage, removeFromStorage, clearStorage } from '@/app/lib/storage';

// localStorageをモック化
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// window.localStorageをモック化
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('storage', () => {
  beforeEach(() => {
    // 各テスト前にモックをクリア
    vi.clearAllMocks();
  });

  describe('saveToStorage', () => {
    it('データをJSON形式で保存する', () => {
      const testData = { name: 'テスト', value: 123 };
      saveToStorage('test-key', testData);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(testData)
      );
    });

    it('null値を保存する', () => {
      saveToStorage('null-key', null);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'null-key',
        'null'
      );
    });

    it('配列データを保存する', () => {
      const testArray = [1, 2, 3, 'test'];
      saveToStorage('array-key', testArray);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'array-key',
        JSON.stringify(testArray)
      );
    });
  });

  describe('loadFromStorage', () => {
    it('保存されたデータを読み込む', () => {
      const testData = { name: 'テスト', value: 123 };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));

      const result = loadFromStorage('test-key');

      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toEqual(testData);
    });

    it('存在しないキーの場合はnullを返す', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadFromStorage('non-existent-key');

      expect(result).toBeNull();
    });

    it('無効なJSONの場合はnullを返す', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const result = loadFromStorage('invalid-key');

      expect(result).toBeNull();
    });

    it('デフォルト値を返す', () => {
      localStorageMock.getItem.mockReturnValue(null);
      const defaultValue = { default: true };

      const result = loadFromStorage('test-key', defaultValue);

      expect(result).toEqual(defaultValue);
    });
  });

  describe('removeFromStorage', () => {
    it('指定したキーのデータを削除する', () => {
      removeFromStorage('test-key');

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
    });
  });

  describe('clearStorage', () => {
    it('すべてのlocalStorageデータを削除する', () => {
      clearStorage();

      expect(localStorageMock.clear).toHaveBeenCalled();
    });
  });
});