/**
 * 日付を日本語形式でフォーマットする
 * @param date - フォーマットする日付
 * @returns YYYY/MM/DD形式の文字列
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * 指定した日付が週末（土日）かどうかを判定する
 * @param date - 判定する日付
 * @returns 週末の場合true
 */
export function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; // 0: 日曜日, 6: 土曜日
}

/**
 * 指定した日付に日数を追加する（元の日付は変更しない）
 * @param date - 基準日付
 * @param days - 追加する日数（負の値も可能）
 * @returns 新しい日付オブジェクト
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 2つの日付が同じ日かどうかを判定する（時刻は無視）
 * @param date1 - 比較する日付1
 * @param date2 - 比較する日付2
 * @returns 同じ日の場合true
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * 指定した日付が今日かどうかを判定する
 * @param date - 判定する日付
 * @returns 今日の場合true
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/**
 * 指定した日付の週の開始日（日曜日）を取得する
 * @param date - 基準日付
 * @returns 週の開始日（日曜日）
 */
export function getWeekStart(date: Date): Date {
  const result = new Date(date);
  const dayOfWeek = result.getDay();
  result.setDate(result.getDate() - dayOfWeek);
  return result;
}

/**
 * 指定した月の最初の日を取得する
 * @param date - 基準日付
 * @returns 月の最初の日
 */
export function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * 指定した月の最後の日を取得する
 * @param date - 基準日付
 * @returns 月の最後の日
 */
export function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * 指定した月のすべての日付を配列で取得する
 * @param date - 基準日付
 * @returns その月のすべての日付の配列
 */
export function getMonthDays(date: Date): Date[] {
  const end = getMonthEnd(date);
  const days: Date[] = [];

  for (let day = 1; day <= end.getDate(); day++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), day));
  }

  return days;
}