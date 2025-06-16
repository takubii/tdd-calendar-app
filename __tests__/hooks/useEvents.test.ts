import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEvents } from '@/app/hooks/useEvents';
import { CalendarEvent } from '@/app/types/calendar';
import * as storage from '@/app/lib/storage';

// モックデータ
const mockEvent: CalendarEvent = {
  id: '1',
  title: 'テストイベント',
  description: 'イベントの説明',
  date: new Date('2024-12-25'),
  startTime: '10:00',
  endTime: '11:00',
  color: '#3b82f6',
  createdAt: new Date('2024-12-20'),
  updatedAt: new Date('2024-12-20')
};

const mockEvent2: CalendarEvent = {
  id: '2',
  title: 'テストイベント2',
  description: 'イベントの説明2',
  date: new Date('2024-12-26'),
  startTime: '14:00',
  endTime: '15:00',
  color: '#ef4444',
  createdAt: new Date('2024-12-20'),
  updatedAt: new Date('2024-12-20')
};

// ストレージ関数をモック化
vi.mock('@/app/lib/storage', () => ({
  loadFromStorage: vi.fn(),
  saveToStorage: vi.fn(),
  removeFromStorage: vi.fn()
}));

describe('useEvents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // デフォルトで空配列を返すようにモック設定
    vi.mocked(storage.loadFromStorage).mockReturnValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('初期化', () => {
    it('初期状態で空の配列が返される', () => {
      const { result } = renderHook(() => useEvents());
      expect(result.current.events).toEqual([]);
    });

    it('ローカルストレージからイベントデータを読み込む', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent]);

      const { result } = renderHook(() => useEvents());

      expect(storage.loadFromStorage).toHaveBeenCalledWith('calendar-events', []);
      expect(result.current.events).toEqual([mockEvent]);
    });
  });

  describe('イベント追加', () => {
    it('新しいイベントを追加できる', () => {
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.addEvent({
          title: 'テストイベント',
          description: 'イベントの説明',
          date: new Date('2024-12-25'),
          startTime: '10:00',
          endTime: '11:00',
          color: '#3b82f6'
        });
      });

      expect(result.current.events).toHaveLength(1);
      expect(result.current.events[0]).toMatchObject({
        title: 'テストイベント',
        description: 'イベントの説明',
        date: new Date('2024-12-25'),
        startTime: '10:00',
        endTime: '11:00',
        color: '#3b82f6'
      });
      expect(result.current.events[0].id).toBeTruthy();
      expect(result.current.events[0].createdAt).toBeInstanceOf(Date);
      expect(result.current.events[0].updatedAt).toBeInstanceOf(Date);
    });

    it('イベント追加時にローカルストレージに保存される', () => {
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.addEvent({
          title: 'テストイベント',
          description: 'イベントの説明',
          date: new Date('2024-12-25'),
          startTime: '10:00',
          endTime: '11:00',
          color: '#3b82f6'
        });
      });

      expect(storage.saveToStorage).toHaveBeenCalledWith('calendar-events', expect.any(Array));
    });
  });

  describe('イベント更新', () => {
    it('既存のイベントを更新できる', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.updateEvent(mockEvent.id, {
          title: '更新されたイベント',
          description: '更新された説明',
          startTime: '11:00',
          endTime: '12:00'
        });
      });

      expect(result.current.events[0]).toMatchObject({
        id: mockEvent.id,
        title: '更新されたイベント',
        description: '更新された説明',
        date: mockEvent.date,
        startTime: '11:00',
        endTime: '12:00',
        color: mockEvent.color,
        createdAt: mockEvent.createdAt
      });
      expect(result.current.events[0].updatedAt.getTime()).toBeGreaterThan(mockEvent.updatedAt.getTime());
    });

    it('存在しないイベントIDで更新しようとした場合は何もしない', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.updateEvent('存在しないID', {
          title: '更新されたイベント'
        });
      });

      expect(result.current.events).toEqual([mockEvent]);
    });

    it('イベント更新時にローカルストレージに保存される', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.updateEvent(mockEvent.id, {
          title: '更新されたイベント'
        });
      });

      expect(storage.saveToStorage).toHaveBeenCalledWith('calendar-events', expect.any(Array));
    });
  });

  describe('イベント削除', () => {
    it('指定したIDのイベントを削除できる', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent, mockEvent2]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.deleteEvent(mockEvent.id);
      });

      expect(result.current.events).toHaveLength(1);
      expect(result.current.events[0]).toEqual(mockEvent2);
    });

    it('存在しないイベントIDで削除しようとした場合は何もしない', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.deleteEvent('存在しないID');
      });

      expect(result.current.events).toEqual([mockEvent]);
    });

    it('イベント削除時にローカルストレージに保存される', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent, mockEvent2]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.deleteEvent(mockEvent.id);
      });

      expect(storage.saveToStorage).toHaveBeenCalledWith('calendar-events', expect.any(Array));
    });
  });

  describe('日付による絞り込み', () => {
    it('指定した日付のイベントを取得できる', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent, mockEvent2]);
      const { result } = renderHook(() => useEvents());

      const eventsForDate = result.current.getEventsForDate(new Date('2024-12-25'));
      expect(eventsForDate).toHaveLength(1);
      expect(eventsForDate[0]).toEqual(mockEvent);
    });

    it('イベントが存在しない日付の場合は空配列を返す', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent]);
      const { result } = renderHook(() => useEvents());

      const eventsForDate = result.current.getEventsForDate(new Date('2024-12-27'));
      expect(eventsForDate).toEqual([]);
    });

    it('同じ日付の複数イベントを正しく取得できる', () => {
      const sameDate = new Date('2024-12-25');
      const event1 = { ...mockEvent, id: '1', date: sameDate };
      const event2 = { ...mockEvent, id: '2', date: sameDate, title: 'イベント2' };

      vi.mocked(storage.loadFromStorage).mockReturnValue([event1, event2, mockEvent2]);
      const { result } = renderHook(() => useEvents());

      const eventsForDate = result.current.getEventsForDate(sameDate);
      expect(eventsForDate).toHaveLength(2);
      expect(eventsForDate).toContainEqual(event1);
      expect(eventsForDate).toContainEqual(event2);
    });
  });

  describe('全イベント削除', () => {
    it('全てのイベントを削除できる', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent, mockEvent2]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.clearAllEvents();
      });

      expect(result.current.events).toEqual([]);
    });

    it('全イベント削除時にローカルストレージからも削除される', () => {
      vi.mocked(storage.loadFromStorage).mockReturnValue([mockEvent, mockEvent2]);
      const { result } = renderHook(() => useEvents());

      act(() => {
        result.current.clearAllEvents();
      });

      expect(storage.removeFromStorage).toHaveBeenCalledWith('calendar-events');
    });
  });
});