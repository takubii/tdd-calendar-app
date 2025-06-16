'use client';

import { useState } from 'react';
import { getCalendarWeeks, formatDate } from '@/app/lib/dateUtils';
import { cn } from '@/app/lib/utils';

interface CalendarGridProps {
  year: number;
  month: number; // 0ベース（0: 1月, 11: 12月）
  onDateSelect?: (date: Date) => void;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function CalendarGrid({ year, month, onDateSelect }: CalendarGridProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const weeks = getCalendarWeeks(year, month);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', formatDate(date));
    onDateSelect?.(date);
  };

  const getDateButtonClasses = (date: Date, isCurrentMonth: boolean, isToday: boolean, isSelected: boolean) => {
    const baseClasses = 'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors hover:bg-gray-100';

    return cn(
      baseClasses,
      {
        // 今日の日付
        'bg-blue-500 text-white hover:bg-blue-600': isToday,
        // 選択された日付
        'bg-blue-100 text-blue-900': isSelected && !isToday,
        // 現在の月以外の日付
        'text-gray-400': !isCurrentMonth,
        // 週末の日付（日曜日）
        'text-red-500': date.getDay() === 0 && isCurrentMonth && !isToday && !isSelected,
        // 通常の日付
        'text-gray-900': isCurrentMonth && !isToday && !isSelected && date.getDay() !== 0,
      }
    );
  };

  const getAriaLabel = (date: Date, isCurrentMonth: boolean) => {
    const formattedDate = formatDate(date);
    const monthName = isCurrentMonth ? '' : '（前月または翌月）';
    return `${formattedDate}${monthName}`;
  };

  return (
    <div className="w-full">
      {/* 選択された日付の表示 */}
      {selectedDate && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            選択された日付: <span className="font-semibold">{formatDate(selectedDate)}</span>
          </p>
        </div>
      )}

      {/* カレンダーグリッド */}
      <div
        role="grid"
        aria-label={`${year}年${month + 1}月のカレンダー`}
        className="grid grid-cols-7 gap-1"
      >
        {/* 曜日ヘッダー */}
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            role="columnheader"
            className={cn(
              'h-10 flex items-center justify-center text-sm font-semibold',
              {
                'text-red-500': index === 0, // 日曜日
                'text-blue-500': index === 6, // 土曜日
                'text-gray-700': index !== 0 && index !== 6, // 平日
              }
            )}
          >
            {day}
          </div>
        ))}

        {/* 日付セル */}
        {weeks.map((week, weekIndex) =>
          week.days.map((day, dayIndex) => {
            const isSelected = selectedDate ?
              day.date.getDate() === selectedDate.getDate() &&
              day.date.getMonth() === selectedDate.getMonth() &&
              day.date.getFullYear() === selectedDate.getFullYear()
              : false;

            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                type="button"
                role="gridcell"
                aria-label={getAriaLabel(day.date, day.isCurrentMonth)}
                className={getDateButtonClasses(day.date, day.isCurrentMonth, day.isToday, isSelected)}
                onClick={() => handleDateClick(day.date)}
              >
                {day.date.getDate()}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}