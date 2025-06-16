'use client';

import { CalendarGridProps, CalendarDate } from '@/app/types/calendar';
import {
  getMonthStart,
  getWeekStart,
  addDays,
  isSameDay,
  isToday,
  isWeekend
} from '@/app/lib/dateUtils';
import { cn } from '@/app/lib/utils';

export function CalendarGrid({
  currentDate,
  selectedDate,
  onDateSelect
}: CalendarGridProps) {
  // カレンダーグリッドに表示する全ての日付を生成
  const generateCalendarDates = (): CalendarDate[] => {
    const monthStart = getMonthStart(currentDate);
    const calendarStart = getWeekStart(monthStart);

    // 6週間分の日付を生成（42日）
    const dates: CalendarDate[] = [];
    let currentCalendarDate = new Date(calendarStart);

    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = currentCalendarDate.getMonth() === currentDate.getMonth();

      dates.push({
        year: currentCalendarDate.getFullYear(),
        month: currentCalendarDate.getMonth(),
        day: currentCalendarDate.getDate(),
        isCurrentMonth,
        isToday: isToday(currentCalendarDate),
        isWeekend: isWeekend(currentCalendarDate)
      });

      currentCalendarDate = addDays(currentCalendarDate, 1);
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();
  const dayHeaders = ['日', '月', '火', '水', '木', '金', '土'];

  const handleDateClick = (calendarDate: CalendarDate) => {
    // ローカル時間で正確な日付を作成
    const date = new Date(calendarDate.year, calendarDate.month, calendarDate.day, 0, 0, 0, 0);
    onDateSelect(date);
  };

  const formatDateLabel = (calendarDate: CalendarDate): string => {
    return `${calendarDate.year}年${calendarDate.month + 1}月${calendarDate.day}日`;
  };

  const isSelected = (calendarDate: CalendarDate): boolean => {
    if (!selectedDate) return false;
    const date = new Date(calendarDate.year, calendarDate.month, calendarDate.day, 0, 0, 0, 0);
    return isSameDay(date, selectedDate);
  };

  return (
    <table role="table" aria-label="カレンダー" className="w-full border-collapse">
      {/* 曜日ヘッダー */}
      <thead>
        <tr>
          {dayHeaders.map((day, index) => (
            <th
              key={index}
              className="p-2 text-center text-sm font-medium text-gray-700 border-b"
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>

      {/* カレンダーグリッド */}
      <tbody>
        {Array.from({ length: 6 }, (_, weekIndex) => (
          <tr key={weekIndex}>
            {Array.from({ length: 7 }, (_, dayIndex) => {
              const dateIndex = weekIndex * 7 + dayIndex;
              const calendarDate = calendarDates[dateIndex];
              const selected = isSelected(calendarDate);

              return (
                <td key={dayIndex} className="p-0 border border-gray-200">
                  <button
                    type="button"
                    tabIndex={0}
                    aria-label={formatDateLabel(calendarDate)}
                    aria-selected={selected}
                    onClick={() => handleDateClick(calendarDate)}
                    className={cn(
                      'w-full h-12 p-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
                      // 基本スタイル
                      'hover:bg-gray-100',
                      // 選択状態
                      selected && 'bg-blue-600 text-white hover:bg-blue-700',
                      // 今日のスタイル
                      calendarDate.isToday && !selected && 'ring-2 ring-blue-500',
                      // 他の月の日付
                      !calendarDate.isCurrentMonth && 'text-gray-400',
                      // 週末のスタイル（日曜日=0は赤、土曜日=6は青）
                      calendarDate.isWeekend && calendarDate.isCurrentMonth && !selected && (
                        new Date(calendarDate.year, calendarDate.month, calendarDate.day).getDay() === 0 ? 'text-red-500' : 'text-blue-500'
                      )
                    )}
                  >
                    <span aria-label={`${calendarDate.day}日`}>
                      {calendarDate.day}
                    </span>
                  </button>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}