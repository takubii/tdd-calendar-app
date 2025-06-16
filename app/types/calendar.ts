export type CalendarView = 'month' | 'week' | 'day';

export interface CalendarState {
  currentDate: Date;
  view: CalendarView;
  selectedDate?: Date;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  dayOfWeek: number; // 0: 日曜日, 1: 月曜日, ..., 6: 土曜日
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface CalendarMonth {
  year: number;
  month: number; // 0ベース（0: 1月, 11: 12月）
  weeks: CalendarWeek[];
}