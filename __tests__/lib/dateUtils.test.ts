import { describe, it, expect } from 'vitest';
import {
  formatDate,
  isToday,
  isSameDay,
  getMonthDays,
  getCalendarWeeks,
  getDayOfWeek
} from '@/app/lib/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('日付を日本語形式でフォーマットする', () => {
      const date = new Date('2024-12-25');
      const result = formatDate(date);
      expect(result).toBe('2024/12/25');
    });

    it('一桁の月と日にはゼロパディングを行う', () => {
      const date = new Date('2024-01-05');
      const result = formatDate(date);
      expect(result).toBe('2024/01/05');
    });
  });

  describe('isToday', () => {
    it('今日の日付の場合trueを返す', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('今日以外の日付の場合falseを返す', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('isSameDay', () => {
    it('同じ日付の場合trueを返す', () => {
      const date1 = new Date('2024-12-25');
      const date2 = new Date('2024-12-25');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('異なる日付の場合falseを返す', () => {
      const date1 = new Date('2024-12-25');
      const date2 = new Date('2024-12-26');
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('時刻が異なっても同じ日付の場合trueを返す', () => {
      const date1 = new Date('2024-12-25T10:00:00');
      const date2 = new Date('2024-12-25T15:30:00');
      expect(isSameDay(date1, date2)).toBe(true);
    });
  });

  describe('getDayOfWeek', () => {
    it('日曜日の場合0を返す', () => {
      const sunday = new Date('2024-12-29'); // 日曜日
      expect(getDayOfWeek(sunday)).toBe(0);
    });

    it('月曜日の場合1を返す', () => {
      const monday = new Date('2024-12-30'); // 月曜日
      expect(getDayOfWeek(monday)).toBe(1);
    });

    it('土曜日の場合6を返す', () => {
      const saturday = new Date('2024-12-28'); // 土曜日
      expect(getDayOfWeek(saturday)).toBe(6);
    });
  });

  describe('getMonthDays', () => {
    it('2024年12月の日数は31日を返す', () => {
      const days = getMonthDays(2024, 11); // 11 = 12月（0ベース）
      expect(days).toBe(31);
    });

    it('2024年2月の日数は29日を返す（うるう年）', () => {
      const days = getMonthDays(2024, 1); // 1 = 2月（0ベース）
      expect(days).toBe(29);
    });

    it('2023年2月の日数は28日を返す（平年）', () => {
      const days = getMonthDays(2023, 1); // 1 = 2月（0ベース）
      expect(days).toBe(28);
    });
  });

  describe('getCalendarWeeks', () => {
    it('2024年12月のカレンダー週を正しく生成する', () => {
      const weeks = getCalendarWeeks(2024, 11); // 11 = 12月（0ベース）

      // 6週間のデータが返されること
      expect(weeks).toHaveLength(6);

      // 各週は7日間であること
      weeks.forEach(week => {
        expect(week.days).toHaveLength(7);
      });

      // 最初の日は日曜日であること
      expect(weeks[0].days[0].dayOfWeek).toBe(0);

      // 12月1日が正しい位置にあること
      const firstDay = weeks[0].days.find(day =>
        day.date.getDate() === 1 &&
        day.date.getMonth() === 11 &&
        day.isCurrentMonth
      );
      expect(firstDay).toBeDefined();
      expect(firstDay?.dayOfWeek).toBe(0); // 2024年12月1日は日曜日
    });

    it('前月・翌月の日付を含む完全なカレンダーを生成する', () => {
      const weeks = getCalendarWeeks(2024, 11); // 11 = 12月（0ベース）

      // 前月の日付が含まれていること（12月1日が日曜日でない場合）
      const hasNonCurrentMonth = weeks.some(week =>
        week.days.some(day => !day.isCurrentMonth)
      );

      // 42日（6週間 × 7日）すべてが埋まっていること
      const totalDays = weeks.reduce((total, week) => total + week.days.length, 0);
      expect(totalDays).toBe(42);
    });

    it('今日の日付を正しく特定する', () => {
      const today = new Date();
      const weeks = getCalendarWeeks(today.getFullYear(), today.getMonth());

      const todayCell = weeks
        .flatMap(week => week.days)
        .find(day => day.isToday);

      expect(todayCell).toBeDefined();
      expect(todayCell?.date.getDate()).toBe(today.getDate());
    });
  });
});