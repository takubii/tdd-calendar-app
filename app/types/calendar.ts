export interface CalendarDate {
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

export interface CalendarState {
  currentDate: Date;
  selectedDate: Date | null;
  viewMode: "month" | "week";
}

export interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  events?: CalendarEvent[];
  onAddEvent?: (date: Date) => void;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}