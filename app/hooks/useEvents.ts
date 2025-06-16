import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/app/types/calendar';
import { generateId } from '@/app/lib/utils';
import { isSameDay } from '@/app/lib/dateUtils';
import { loadFromStorage, saveToStorage, removeFromStorage } from '@/app/lib/storage';

export interface CreateEventData {
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  color: string;
}

export interface UpdateEventData {
  title?: string;
  description?: string;
  date?: Date;
  startTime?: string;
  endTime?: string;
  color?: string;
}

export interface UseEventsReturn {
  events: CalendarEvent[];
  addEvent: (eventData: CreateEventData) => void;
  updateEvent: (id: string, eventData: UpdateEventData) => void;
  deleteEvent: (id: string) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  clearAllEvents: () => void;
}

const STORAGE_KEY = 'calendar-events';

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // 初期化時にローカルストレージからデータを読み込み
  useEffect(() => {
    const savedEvents = loadFromStorage<CalendarEvent[]>(STORAGE_KEY, []);
    if (savedEvents && savedEvents.length > 0) {
      // 日付文字列をDateオブジェクトに変換
      const eventsWithDates = savedEvents.map(event => ({
        ...event,
        date: new Date(event.date),
        createdAt: new Date(event.createdAt),
        updatedAt: new Date(event.updatedAt)
      }));
      setEvents(eventsWithDates);
    }
  }, []);

  // イベントリストが変更された時にローカルストレージに保存
  const saveEvents = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents);
    saveToStorage(STORAGE_KEY, newEvents);
  };

  // イベント追加
  const addEvent = (eventData: CreateEventData): void => {
    const now = new Date();
    const newEvent: CalendarEvent = {
      id: generateId(),
      ...eventData,
      createdAt: now,
      updatedAt: now
    };

    const newEvents = [...events, newEvent];
    saveEvents(newEvents);
  };

  // イベント更新
  const updateEvent = (id: string, eventData: UpdateEventData): void => {
    const updatedEvents = events.map(event => {
      if (event.id === id) {
        return {
          ...event,
          ...eventData,
          updatedAt: new Date()
        };
      }
      return event;
    });

    // 実際に変更があった場合のみ保存
    const hasChanged = updatedEvents.some((event, index) =>
      event !== events[index]
    );

    if (hasChanged) {
      saveEvents(updatedEvents);
    }
  };

  // イベント削除
  const deleteEvent = (id: string): void => {
    const filteredEvents = events.filter(event => event.id !== id);

    // 実際に削除された場合のみ保存
    if (filteredEvents.length !== events.length) {
      saveEvents(filteredEvents);
    }
  };

  // 指定日付のイベント取得
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(event.date, date));
  };

  // 全イベント削除
  const clearAllEvents = (): void => {
    setEvents([]);
    removeFromStorage(STORAGE_KEY);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    clearAllEvents
  };
}