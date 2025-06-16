import { describe, it, expect } from 'vitest';
import {
  formatDate,
  isWeekend,
  addDays,
  getMonthDays,
  isSameDay,
  isToday,
  getWeekStart,
  getMonthStart,
  getMonthEnd
} from '@/app/lib/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('日付を日本語形式でフォーマットする', () => {
      const date = new Date('2024-12-25');
      const result = formatDate(date);
      expect(result).toBe('2024/12/25');
    });

    it('1桁の月日を2桁でフォーマットする', () => {
      const date = new Date('2024-01-05');
      const result = formatDate(date);
      expect(result).toBe('2024/01/05');
    });
  });

  describe('isWeekend', () => {
    it('土曜日の場合trueを返す', () => {
      const saturday = new Date('2024-12-28'); // 土曜日
      expect(isWeekend(saturday)).toBe(true);
    });

    it('日曜日の場合trueを返す', () => {
      const sunday = new Date('2024-12-29'); // 日曜日
      expect(isWeekend(sunday)).toBe(true);
    });

    it('平日の場合falseを返す', () => {
      const monday = new Date('2024-12-30'); // 月曜日
      expect(isWeekend(monday)).toBe(false);
    });
  });

  describe('addDays', () => {
    it('指定した日数を追加する', () => {
      const baseDate = new Date('2024-12-25');
      const result = addDays(baseDate, 7);
      expect(result.getDate()).toBe(1); // 2025年1月1日
      expect(result.getMonth()).toBe(0); // 1月（0ベース）
      expect(result.getFullYear()).toBe(2025);
    });

    it('元の日付を変更しない', () => {
      const baseDate = new Date('2024-12-25');
      const originalDate = baseDate.getDate();
      addDays(baseDate, 7);
      expect(baseDate.getDate()).toBe(originalDate);
    });

    it('負の値で日付を戻すことができる', () => {
      const baseDate = new Date('2024-12-25');
      const result = addDays(baseDate, -10);
      expect(result.getDate()).toBe(15);
      expect(result.getMonth()).toBe(11); // 12月（0ベース）
    });
  });

  describe('isSameDay', () => {
    it('同じ日付の場合trueを返す', () => {
      const date1 = new Date('2024-12-25T10:00:00');
      const date2 = new Date('2024-12-25T15:30:00');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('異なる日付の場合falseを返す', () => {
      const date1 = new Date('2024-12-25');
      const date2 = new Date('2024-12-26');
      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('今日の日付の場合trueを返す', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('今日以外の日付の場合falseを返す', () => {
      const yesterday = addDays(new Date(), -1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('getWeekStart', () => {
    it('日曜日から始まる週の開始日を取得する', () => {
      const wednesday = new Date('2024-12-25'); // 水曜日
      const weekStart = getWeekStart(wednesday);
      expect(weekStart.getDay()).toBe(0); // 日曜日
      expect(weekStart.getDate()).toBe(22); // 12月22日（日曜日）
    });

    it('日曜日の場合は同じ日付を返す', () => {
      const sunday = new Date('2024-12-22'); // 日曜日
      const weekStart = getWeekStart(sunday);
      expect(isSameDay(sunday, weekStart)).toBe(true);
    });
  });

  describe('getMonthStart', () => {
    it('月の最初の日を取得する', () => {
      const date = new Date('2024-12-25');
      const monthStart = getMonthStart(date);
      expect(monthStart.getDate()).toBe(1);
      expect(monthStart.getMonth()).toBe(11); // 12月（0ベース）
      expect(monthStart.getFullYear()).toBe(2024);
    });
  });

  describe('getMonthEnd', () => {
    it('月の最後の日を取得する', () => {
      const date = new Date('2024-12-25');
      const monthEnd = getMonthEnd(date);
      expect(monthEnd.getDate()).toBe(31); // 12月31日
      expect(monthEnd.getMonth()).toBe(11); // 12月（0ベース）
    });

    it('2月の場合は28日または29日を返す', () => {
      const feb2024 = new Date('2024-02-15'); // うるう年
      const monthEnd2024 = getMonthEnd(feb2024);
      expect(monthEnd2024.getDate()).toBe(29);

      const feb2023 = new Date('2023-02-15'); // 平年
      const monthEnd2023 = getMonthEnd(feb2023);
      expect(monthEnd2023.getDate()).toBe(28);
    });
  });

  describe('getMonthDays', () => {
    it('月のすべての日付を配列で返す', () => {
      const date = new Date('2024-02-15');
      const days = getMonthDays(date);
      expect(days).toHaveLength(29); // 2024年2月はうるう年
      expect(days[0].getDate()).toBe(1);
      expect(days[28].getDate()).toBe(29);
    });

    it('各日付が正しい月であることを確認する', () => {
      const date = new Date('2024-12-15');
      const days = getMonthDays(date);
      days.forEach(day => {
        expect(day.getMonth()).toBe(11); // 12月（0ベース）
        expect(day.getFullYear()).toBe(2024);
      });
    });
  });
});