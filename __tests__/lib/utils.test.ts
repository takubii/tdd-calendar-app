import { describe, it, expect } from 'vitest';
import { cn, generateId, clamp, debounce } from '@/app/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('文字列を結合する', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('undefinedやnullを無視する', () => {
      const result = cn('class1', undefined, 'class2', null, 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('空文字列を無視する', () => {
      const result = cn('class1', '', 'class2', '   ', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('条件付きクラスを処理する', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled'
      );
      expect(result).toBe('base-class active');
    });
  });

  describe('generateId', () => {
    it('指定した長さのIDを生成する', () => {
      const id = generateId(8);
      expect(id).toHaveLength(8);
    });

    it('デフォルトで16文字のIDを生成する', () => {
      const id = generateId();
      expect(id).toHaveLength(16);
    });

    it('英数字のみを含む', () => {
      const id = generateId(32);
      expect(id).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it('呼び出すたびに異なるIDを生成する', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('clamp', () => {
    it('値が範囲内の場合はそのまま返す', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('値が最小値未満の場合は最小値を返す', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('値が最大値を超える場合は最大値を返す', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('小数点も正しく処理する', () => {
      expect(clamp(2.5, 0, 5)).toBe(2.5);
      expect(clamp(-1.5, 0, 5)).toBe(0);
      expect(clamp(6.5, 0, 5)).toBe(5);
    });
  });

  describe('debounce', () => {
    it('指定した時間内の連続した呼び出しを遅延させる', async () => {
      let counter = 0;
      const increment = () => counter++;
      const debouncedIncrement = debounce(increment, 100);

      // 連続して呼び出し
      debouncedIncrement();
      debouncedIncrement();
      debouncedIncrement();

      // すぐには実行されない
      expect(counter).toBe(0);

      // 100ms後に1回だけ実行される
      await new Promise(resolve => setTimeout(resolve, 150));
      expect(counter).toBe(1);
    });

    it('引数を正しく渡す', async () => {
      let lastArg: string | undefined;
      const saveArg = (arg: string) => { lastArg = arg; };
      const debouncedSaveArg = debounce(saveArg, 50);

      debouncedSaveArg('first');
      debouncedSaveArg('second');
      debouncedSaveArg('third');

      await new Promise(resolve => setTimeout(resolve, 100));
      expect(lastArg).toBe('third');
    });
  });
});