import { useState, useCallback } from 'react';
import { isSameDay, getMonthDays } from '@/app/lib/dateUtils';

export type ViewMode = 'month' | 'week';

export interface UseCalendarReturn {
  currentDate: Date;
  selectedDate: Date | null;
  viewMode: ViewMode;
  selectDate: (date: Date) => void;
  clearSelection: () => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  goToDate: (date: Date) => void;
  setViewMode: (mode: ViewMode) => void;
  getCurrentMonthDays: () => Date[];
  isSelectedDateToday: () => boolean;
}

export function useCalendar(initialDate: Date = new Date()): UseCalendarReturn {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(initialDate));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('month');

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(prevSelected => {
      // 同じ日付を再選択した場合は選択解除
      if (prevSelected && isSameDay(prevSelected, date)) {
        return null;
      }
      return new Date(date);
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedDate(null);
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const goToDate = useCallback((date: Date) => {
    setCurrentDate(new Date(date));
  }, []);

  const getCurrentMonthDays = useCallback(() => {
    return getMonthDays(currentDate);
  }, [currentDate]);

  const isSelectedDateToday = useCallback(() => {
    if (!selectedDate) return false;
    return isSameDay(selectedDate, new Date());
  }, [selectedDate]);

  return {
    currentDate,
    selectedDate,
    viewMode,
    selectDate,
    clearSelection,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    goToDate,
    setViewMode,
    getCurrentMonthDays,
    isSelectedDateToday,
  };
}