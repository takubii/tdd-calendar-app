import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventList } from '@/app/components/features/calendar/EventList';
import { CalendarEvent } from '@/app/types/calendar';

// テスト用のモックイベントデータ
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: '会議',
    description: 'プロジェクトミーティング',
    date: new Date('2024-12-25'),
    startTime: '10:00',
    endTime: '11:00',
    color: '#3b82f6',
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20'),
  },
  {
    id: '2',
    title: 'ランチ',
    date: new Date('2024-12-25'),
    startTime: '12:00',
    endTime: '13:00',
    color: '#ef4444',
    createdAt: new Date('2024-12-21'),
    updatedAt: new Date('2024-12-21'),
  },
];

describe('EventList', () => {
  it('イベント一覧を表示する', () => {
    render(<EventList events={mockEvents} />);

    expect(screen.getByText('会議')).toBeInTheDocument();
    expect(screen.getByText('ランチ')).toBeInTheDocument();
  });

  it('イベントが存在しない場合「イベントがありません」を表示する', () => {
    render(<EventList events={[]} />);

    expect(screen.getByText('イベントがありません')).toBeInTheDocument();
  });

  it('イベントクリック時にonEventClickハンドラーが呼ばれる', () => {
    const handleEventClick = vi.fn();
    render(
      <EventList
        events={mockEvents}
        onEventClick={handleEventClick}
      />
    );

    fireEvent.click(screen.getByText('会議'));
    expect(handleEventClick).toHaveBeenCalledWith(mockEvents[0]);
  });

  it('各イベントの時間が表示される', () => {
    render(<EventList events={mockEvents} />);

    expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
    expect(screen.getByText('12:00 - 13:00')).toBeInTheDocument();
  });

  it('説明のないイベントでも正しく表示される', () => {
    const eventsWithoutDescription = [mockEvents[1]]; // ランチは説明なし
    render(<EventList events={eventsWithoutDescription} />);

    expect(screen.getByText('ランチ')).toBeInTheDocument();
    expect(screen.getByText('12:00 - 13:00')).toBeInTheDocument();
  });

  it('時間のないイベントは時間表示をしない', () => {
    const eventsWithoutTime: CalendarEvent[] = [
      {
        id: '3',
        title: '一日イベント',
        date: new Date('2024-12-25'),
        color: '#10b981',
        createdAt: new Date('2024-12-20'),
        updatedAt: new Date('2024-12-20'),
      },
    ];

    render(<EventList events={eventsWithoutTime} />);

    expect(screen.getByText('一日イベント')).toBeInTheDocument();
    expect(screen.queryByText('-')).not.toBeInTheDocument();
  });

      it('イベントの色が適用される', () => {
    render(<EventList events={[mockEvents[0]]} />);

    // イベントコンテナ（border-colorが適用されるdiv）を取得
    const eventContainer = screen.getByText('会議').closest('.border');
    expect(eventContainer).toHaveStyle({ borderColor: '#3b82f6' });
  });

  it('onEventEditハンドラーが存在する場合編集ボタンが表示される', () => {
    const handleEventEdit = vi.fn();
    render(
      <EventList
        events={mockEvents}
        onEventEdit={handleEventEdit}
      />
    );

    const editButtons = screen.getAllByLabelText('イベントを編集');
    expect(editButtons).toHaveLength(2);
  });

  it('編集ボタンクリック時にonEventEditハンドラーが呼ばれる', () => {
    const handleEventEdit = vi.fn();
    render(
      <EventList
        events={mockEvents}
        onEventEdit={handleEventEdit}
      />
    );

    const editButtons = screen.getAllByLabelText('イベントを編集');
    fireEvent.click(editButtons[0]);
    expect(handleEventEdit).toHaveBeenCalledWith(mockEvents[0]);
  });

  it('onEventDeleteハンドラーが存在する場合削除ボタンが表示される', () => {
    const handleEventDelete = vi.fn();
    render(
      <EventList
        events={mockEvents}
        onEventDelete={handleEventDelete}
      />
    );

    const deleteButtons = screen.getAllByLabelText('イベントを削除');
    expect(deleteButtons).toHaveLength(2);
  });

  it('削除ボタンクリック時にonEventDeleteハンドラーが呼ばれる', () => {
    const handleEventDelete = vi.fn();
    render(
      <EventList
        events={mockEvents}
        onEventDelete={handleEventDelete}
      />
    );

    const deleteButtons = screen.getAllByLabelText('イベントを削除');
    fireEvent.click(deleteButtons[0]);
    expect(handleEventDelete).toHaveBeenCalledWith(mockEvents[0]);
  });
});