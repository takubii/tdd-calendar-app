import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarDay } from '@/app/components/features/calendar/CalendarDay';

describe('CalendarDay', () => {
  const mockOnSelect = vi.fn();
  const mockOnAddEvent = vi.fn();
  const baseDate = new Date('2024-01-15'); // 月曜日

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('基本機能', () => {
    it('日付が正しく表示される', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('15')).toBeInTheDocument();
    });

    it('クリック時にonSelectが呼ばれる', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      fireEvent.click(dayButton);

      expect(mockOnSelect).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(baseDate);
    });

    it('ボタンとしてアクセス可能である', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toBeInTheDocument();
      expect(dayButton).toHaveAttribute('type', 'button');
    });
  });

  describe('状態表示', () => {
    it('今日の日付の場合特別なスタイルが適用される', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={true}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveClass('bg-blue-100');
      expect(dayButton).toHaveClass('text-blue-800');
    });

    it('選択された日付の場合特別なスタイルが適用される', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={true}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveClass('bg-blue-600');
      expect(dayButton).toHaveClass('text-white');
    });

    it('週末の場合特別なスタイルが適用される', () => {
      const sunday = new Date('2024-01-21'); // 日曜日
      render(
        <CalendarDay
          date={sunday}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={true}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveClass('text-red-600');
    });

    it('当月以外の日付の場合薄いスタイルが適用される', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={false}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveClass('text-gray-400');
    });
  });

  describe('優先順位のスタイル適用', () => {
    it('選択状態が今日よりも優先される', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={true}
          isSelected={true}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveClass('bg-blue-600');
      expect(dayButton).toHaveClass('text-white');
      expect(dayButton).not.toHaveClass('bg-blue-100');
    });

    it('今日が週末よりも優先される（選択されていない場合）', () => {
      const todaySunday = new Date('2024-01-21'); // 日曜日かつ今日
      render(
        <CalendarDay
          date={todaySunday}
          isCurrentMonth={true}
          isToday={true}
          isSelected={false}
          isWeekend={true}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveClass('bg-blue-100');
      expect(dayButton).toHaveClass('text-blue-800');
      expect(dayButton).not.toHaveClass('text-red-600');
    });
  });

  describe('イベント表示', () => {
    const mockEvents = [
      {
        id: '1',
        title: '会議',
        date: baseDate,
        color: '#3b82f6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'ランチ',
        date: baseDate,
        color: '#10b981',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    it('イベントが存在する場合、イベント数が表示される', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          events={mockEvents}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('イベントが存在しない場合、イベント数は表示されない', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          events={[]}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('多数のイベントがある場合、適切に表示される', () => {
      const manyEvents = Array.from({ length: 5 }, (_, i) => ({
        id: `${i + 1}`,
        title: `イベント${i + 1}`,
        date: baseDate,
        color: '#3b82f6',
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          events={manyEvents}
          onSelect={mockOnSelect}
        />
      );

      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  describe('イベント追加機能', () => {
    it('onAddEventが提供されている場合、ダブルクリックでイベント追加が呼ばれる', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
          onAddEvent={mockOnAddEvent}
        />
      );

      const dayButton = screen.getByRole('button');
      fireEvent.doubleClick(dayButton);

      expect(mockOnAddEvent).toHaveBeenCalledTimes(1);
      expect(mockOnAddEvent).toHaveBeenCalledWith(baseDate);
    });

    it('onAddEventが提供されていない場合、ダブルクリッでもエラーが発生しない', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(() => fireEvent.doubleClick(dayButton)).not.toThrow();
    });
  });

  describe('アクセシビリティ', () => {
    it('適切なaria-labelが設定される', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveAttribute('aria-label', '2024年1月15日');
    });

    it('今日の場合、aria-labelに「今日」が含まれる', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={true}
          isSelected={false}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveAttribute('aria-label', '2024年1月15日 (今日)');
    });

    it('選択された場合、aria-labelに「選択中」が含まれる', () => {
      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={true}
          isWeekend={false}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveAttribute('aria-label', '2024年1月15日 (選択中)');
    });

    it('イベントがある場合、aria-labelにイベント数が含まれる', () => {
      const mockEvents = [
        {
          id: '1',
          title: '会議',
          date: baseDate,
          color: '#3b82f6',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      render(
        <CalendarDay
          date={baseDate}
          isCurrentMonth={true}
          isToday={false}
          isSelected={false}
          isWeekend={false}
          events={mockEvents}
          onSelect={mockOnSelect}
        />
      );

      const dayButton = screen.getByRole('button');
      expect(dayButton).toHaveAttribute('aria-label', '2024年1月15日 (イベント1件)');
    });
  });
});