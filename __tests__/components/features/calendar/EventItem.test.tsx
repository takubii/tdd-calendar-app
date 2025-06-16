import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventItem } from '@/app/components/features/calendar/EventItem';
import { CalendarEvent } from '@/app/types/calendar';

describe('EventItem', () => {
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

  describe('基本機能', () => {
    it('イベントのタイトルを表示する', () => {
      render(<EventItem event={mockEvent} />);
      expect(screen.getByText('テストイベント')).toBeInTheDocument();
    });

    it('イベントの時間を表示する', () => {
      render(<EventItem event={mockEvent} />);
      expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
    });

    it('イベントの説明を表示する', () => {
      render(<EventItem event={mockEvent} />);
      expect(screen.getByText('イベントの説明')).toBeInTheDocument();
    });

    it('イベントクリック時にonClickハンドラーが呼ばれる', () => {
      const handleClick = vi.fn();
      render(<EventItem event={mockEvent} onClick={handleClick} />);

      fireEvent.click(screen.getByRole('button', { name: /テストイベント/ }));
      expect(handleClick).toHaveBeenCalledWith(mockEvent);
    });

    it('イベント色の境界線が適用される', () => {
      render(<EventItem event={mockEvent} />);
      const eventContainer = screen.getByRole('button', { name: /テストイベント/ }).parentElement?.parentElement;
      expect(eventContainer).toHaveStyle({ borderColor: '#3b82f6' });
    });
  });

  describe('条件付き表示', () => {
    it('開始時間と終了時間がない場合は時間を表示しない', () => {
      const eventWithoutTime = { ...mockEvent, startTime: undefined, endTime: undefined };
      render(<EventItem event={eventWithoutTime} />);
      expect(screen.queryByText(/:/)).not.toBeInTheDocument();
    });

    it('説明がない場合は説明を表示しない', () => {
      const eventWithoutDescription = { ...mockEvent, description: undefined };
      render(<EventItem event={eventWithoutDescription} />);
      expect(screen.queryByText('イベントの説明')).not.toBeInTheDocument();
    });

    it('開始時間のみある場合は開始時間のみ表示する', () => {
      const eventWithStartTimeOnly = { ...mockEvent, endTime: undefined };
      render(<EventItem event={eventWithStartTimeOnly} />);
      expect(screen.getByText('10:00')).toBeInTheDocument();
      expect(screen.queryByText(' - ')).not.toBeInTheDocument();
    });
  });

  describe('編集・削除機能', () => {
    it('編集ボタンを表示してクリック時にonEditハンドラーが呼ばれる', () => {
      const handleEdit = vi.fn();
      render(<EventItem event={mockEvent} onEdit={handleEdit} />);

      const editButton = screen.getByRole('button', { name: 'イベントを編集' });
      expect(editButton).toBeInTheDocument();

      fireEvent.click(editButton);
      expect(handleEdit).toHaveBeenCalledWith(mockEvent);
    });

    it('削除ボタンを表示してクリック時にonDeleteハンドラーが呼ばれる', () => {
      const handleDelete = vi.fn();
      render(<EventItem event={mockEvent} onDelete={handleDelete} />);

      const deleteButton = screen.getByRole('button', { name: 'イベントを削除' });
      expect(deleteButton).toBeInTheDocument();

      fireEvent.click(deleteButton);
      expect(handleDelete).toHaveBeenCalledWith(mockEvent);
    });

    it('onEditが未定義の場合編集ボタンを表示しない', () => {
      render(<EventItem event={mockEvent} />);
      expect(screen.queryByRole('button', { name: 'イベントを編集' })).not.toBeInTheDocument();
    });

    it('onDeleteが未定義の場合削除ボタンを表示しない', () => {
      render(<EventItem event={mockEvent} />);
      expect(screen.queryByRole('button', { name: 'イベントを削除' })).not.toBeInTheDocument();
    });
  });

  describe('スタイリング', () => {
    it('基本的なスタイルクラスが適用される', () => {
      render(<EventItem event={mockEvent} />);
      const container = screen.getByRole('button', { name: /テストイベント/ }).parentElement?.parentElement;
      expect(container).toHaveClass('border', 'border-gray-200', 'rounded-lg', 'p-3');
    });

    it('ホバー時のスタイルクラスが適用される', () => {
      render(<EventItem event={mockEvent} />);
      const button = screen.getByRole('button', { name: /テストイベント/ });
      expect(button).toHaveClass('group-hover:bg-gray-50', 'transition-colors');
    });
  });

  describe('アクセシビリティ', () => {
    it('メインボタンに適切なaria-labelが設定される', () => {
      render(<EventItem event={mockEvent} />);
      const button = screen.getByRole('button', { name: /テストイベント.*10:00 - 11:00/ });
      expect(button).toBeInTheDocument();
    });

    it('編集・削除ボタンに適切なaria-labelが設定される', () => {
      const handleEdit = vi.fn();
      const handleDelete = vi.fn();
      render(<EventItem event={mockEvent} onEdit={handleEdit} onDelete={handleDelete} />);

      expect(screen.getByRole('button', { name: 'イベントを編集' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'イベントを削除' })).toBeInTheDocument();
    });
  });
});