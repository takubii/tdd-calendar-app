import { CalendarDay, CalendarWeek } from '@/app/types/calendar';

/**
 * 日付を日本語形式（YYYY/MM/DD）でフォーマットする
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * 指定した日付が今日かどうかを判定する
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return isSameDay(date, today);
}

/**
 * 2つの日付が同じ日かどうかを判定する
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

/**
 * 日付の曜日を取得する（0: 日曜日, 1: 月曜日, ..., 6: 土曜日）
 */
export function getDayOfWeek(date: Date): number {
  return date.getDay();
}

/**
 * 指定した年月の日数を取得する
 */
export function getMonthDays(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 指定した年月のカレンダー週データを生成する
 */
export function getCalendarWeeks(year: number, month: number): CalendarWeek[] {
  const weeks: CalendarWeek[] = [];

  // 月の最初の日を取得
  const firstDay = new Date(year, month, 1);

  // カレンダーの開始日を計算（月の最初の日の週の日曜日）
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  // 6週間分のデータを生成
  for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
    const week: CalendarWeek = { days: [] };

    // 1週間分（7日）のデータを生成
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + weekIndex * 7 + dayIndex);

      const calendarDay: CalendarDay = {
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: isToday(currentDate),
        isSelected: false, // 初期値はfalse
        dayOfWeek: getDayOfWeek(currentDate)
      };

      week.days.push(calendarDay);
    }

    weeks.push(week);
  }

  return weeks;
}