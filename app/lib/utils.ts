type ClassValue = string | number | boolean | undefined | null;

/**
 * CSS クラス名を結合するユーティリティ関数
 * @param classes - 結合するクラス名
 * @returns 結合されたクラス名文字列
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .filter(Boolean)
    .map(cls => String(cls).trim())
    .filter(cls => cls.length > 0)
    .join(' ');
}

/**
 * ランダムなIDを生成する
 * @param length - ID の長さ（デフォルト: 16）
 * @returns ランダムなID文字列
 */
export function generateId(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * 値を指定した範囲内にクランプする
 * @param value - クランプする値
 * @param min - 最小値
 * @param max - 最大値
 * @returns クランプされた値
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * 関数の呼び出しを遅延させるデバウンス関数
 * @param func - 遅延させる関数
 * @param delay - 遅延時間（ミリ秒）
 * @returns デバウンスされた関数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}