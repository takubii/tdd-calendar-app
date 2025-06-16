import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCalendar } from '@/app/hooks/useCalendar';

describe('useCalendar', () => {
  const initialDate = new Date('2024-01-15');

  describe('初期化', () => {
    it('初期の現在日付が設定される', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      expect(result.current.currentDate).toEqual(initialDate);
    });

    it('初期の選択日付はnullである', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      expect(result.current.selectedDate).toBeNull();
    });

    it('初期の表示モードはmonthである', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      expect(result.current.viewMode).toBe('month');
    });
  });

  describe('日付選択', () => {
    it('日付を選択できる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));
      const selectDate = new Date('2024-01-20');

      act(() => {
        result.current.selectDate(selectDate);
      });

      expect(result.current.selectedDate).toEqual(selectDate);
    });

    it('選択を解除できる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));
      const selectDate = new Date('2024-01-20');

      act(() => {
        result.current.selectDate(selectDate);
      });

      act(() => {
        result.current.clearSelection();
      });

      expect(result.current.selectedDate).toBeNull();
    });

    it('同じ日付を再選択すると選択解除される', () => {
      const { result } = renderHook(() => useCalendar(initialDate));
      const selectDate = new Date('2024-01-20');

      act(() => {
        result.current.selectDate(selectDate);
      });

      act(() => {
        result.current.selectDate(selectDate);
      });

      expect(result.current.selectedDate).toBeNull();
    });
  });

  describe('月の移動', () => {
    it('前月に移動できる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      act(() => {
        result.current.goToPreviousMonth();
      });

      expect(result.current.currentDate.getMonth()).toBe(11); // 12月 (0ベース)
      expect(result.current.currentDate.getFullYear()).toBe(2023);
    });

    it('次月に移動できる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      act(() => {
        result.current.goToNextMonth();
      });

      expect(result.current.currentDate.getMonth()).toBe(1); // 2月 (0ベース)
      expect(result.current.currentDate.getFullYear()).toBe(2024);
    });

    it('今日に移動できる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));
      const today = new Date();

      act(() => {
        result.current.goToNextMonth();
      });

      act(() => {
        result.current.goToToday();
      });

      expect(result.current.currentDate.getMonth()).toBe(today.getMonth());
      expect(result.current.currentDate.getFullYear()).toBe(today.getFullYear());
    });

    it('特定の日付に移動できる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));
      const targetDate = new Date('2025-06-15');

      act(() => {
        result.current.goToDate(targetDate);
      });

      expect(result.current.currentDate.getMonth()).toBe(5); // 6月 (0ベース)
      expect(result.current.currentDate.getFullYear()).toBe(2025);
    });
  });

  describe('表示モード切り替え', () => {
    it('週表示に切り替えできる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      act(() => {
        result.current.setViewMode('week');
      });

      expect(result.current.viewMode).toBe('week');
    });

    it('月表示に切り替えできる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      act(() => {
        result.current.setViewMode('week');
      });

      act(() => {
        result.current.setViewMode('month');
      });

      expect(result.current.viewMode).toBe('month');
    });
  });

  describe('年をまたぐ月移動', () => {
    it('1月から前月に移動すると前年の12月になる', () => {
      const january = new Date('2024-01-15');
      const { result } = renderHook(() => useCalendar(january));

      act(() => {
        result.current.goToPreviousMonth();
      });

      expect(result.current.currentDate.getMonth()).toBe(11); // 12月 (0ベース)
      expect(result.current.currentDate.getFullYear()).toBe(2023);
    });

    it('12月から次月に移動すると翌年の1月になる', () => {
      const december = new Date('2024-12-15');
      const { result } = renderHook(() => useCalendar(december));

      act(() => {
        result.current.goToNextMonth();
      });

      expect(result.current.currentDate.getMonth()).toBe(0); // 1月 (0ベース)
      expect(result.current.currentDate.getFullYear()).toBe(2025);
    });
  });

  describe('ヘルパー関数', () => {
    it('現在表示月の日付一覧を取得できる', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      const monthDays = result.current.getCurrentMonthDays();

      expect(monthDays).toHaveLength(31); // 2024年1月は31日
      expect(monthDays[0].getDate()).toBe(1);
      expect(monthDays[30].getDate()).toBe(31);
    });

    it('選択された日付が今日かどうかを判定できる', () => {
      const today = new Date();
      const { result } = renderHook(() => useCalendar(today));

      act(() => {
        result.current.selectDate(today);
      });

      expect(result.current.isSelectedDateToday()).toBe(true);
    });

    it('選択された日付が今日でない場合はfalseを返す', () => {
      const today = new Date();
      const { result } = renderHook(() => useCalendar(today));
      const otherDate = new Date('2024-01-01');

      act(() => {
        result.current.selectDate(otherDate);
      });

      expect(result.current.isSelectedDateToday()).toBe(false);
    });

    it('何も選択されていない場合はfalseを返す', () => {
      const { result } = renderHook(() => useCalendar(initialDate));

      expect(result.current.isSelectedDateToday()).toBe(false);
    });
  });
});