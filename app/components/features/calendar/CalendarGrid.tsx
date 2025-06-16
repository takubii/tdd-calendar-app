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
import { CalendarDay } from './CalendarDay';

export function CalendarGrid({
  currentDate,
  selectedDate,
  onDateSelect,
  events = [],
  onAddEvent
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

  const isSelected = (calendarDate: CalendarDate): boolean => {
    if (!selectedDate) return false;
    const date = new Date(calendarDate.year, calendarDate.month, calendarDate.day, 0, 0, 0, 0);
    return isSameDay(date, selectedDate);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
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

              const date = new Date(calendarDate.year, calendarDate.month, calendarDate.day);

              return (
                <td key={dayIndex} className="p-0 border border-gray-200">
                  <CalendarDay
                    date={date}
                    isCurrentMonth={calendarDate.isCurrentMonth}
                    isToday={calendarDate.isToday}
                    isSelected={selected}
                    isWeekend={calendarDate.isWeekend}
                    events={getEventsForDate(date)}
                    onSelect={onDateSelect}
                    onAddEvent={onAddEvent}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}