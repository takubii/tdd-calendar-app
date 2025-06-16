'use client';

import { useState } from 'react';
import { CalendarGrid } from '@/app/components/features/calendar/CalendarGrid';
import { CalendarHeader } from '@/app/components/features/calendar/CalendarHeader';
import { EventList } from '@/app/components/features/calendar/EventList';
import { EventForm } from '@/app/components/features/calendar/EventForm';
import { Modal } from '@/app/components/ui/Modal';
import { Button } from '@/app/components/ui/Button';
import { useCalendar } from '@/app/hooks/useCalendar';
import { useEvents } from '@/app/hooks/useEvents';
import { CalendarEvent } from '@/app/types/calendar';

export default function Home() {
  const {
    currentDate,
    selectedDate,
    selectDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
  } = useEvents();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent>();

  const handleDateSelect = (date: Date) => {
    selectDate(date);
  };

  const handleAddEvent = (date?: Date) => {
    setEditingEvent(undefined);
    setIsFormOpen(true);

    // ダブルクリックで日付が渡された場合は、その日付を選択
    if (date) {
      selectDate(date);
    }
  };

  const handleEditEvent = (event: CalendarEvent) => {
    // イベントの日付を選択
    selectDate(event.date);
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = (event: CalendarEvent) => {
    deleteEvent(event.id);
  };

  const handleFormSave = (eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent({
        ...eventData,
        date: selectedDate || new Date(),
      });
    }
    setIsFormOpen(false);
    setEditingEvent(undefined);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingEvent(undefined);
  };

  // 選択された日付のイベントを取得
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📅 TDD カレンダーアプリ
          </h1>
          <p className="text-gray-600">
            テスト駆動開発で作成されたカレンダーアプリケーション
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* カレンダー部分 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* カレンダーヘッダー */}
              <CalendarHeader
                currentDate={currentDate}
                onPrevMonth={goToPreviousMonth}
                onNextMonth={goToNextMonth}
                onToday={goToToday}
              />

              {/* 選択状態の表示 */}
              <div className="px-6 py-4 bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                  </h2>
                  {selectedDate && (
                    <p className="text-gray-600">
                      選択中: {selectedDate.getFullYear()}年
                      {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
                    </p>
                  )}
                </div>
              </div>

              {/* カレンダーグリッド */}
              <div className="p-6">
                <CalendarGrid
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  events={events}
                  onDateSelect={handleDateSelect}
                  onAddEvent={handleAddEvent}
                />
              </div>
            </div>
          </div>

          {/* イベント部分 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    選択された日のイベント
                  </h3>
                  {selectedDate && (
                    <Button
                      size="sm"
                      onClick={() => handleAddEvent()}
                    >
                      イベントを追加
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <EventList
                  events={selectedDateEvents}
                  onEventEdit={handleEditEvent}
                  onEventDelete={handleDeleteEvent}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex gap-4 text-sm text-gray-500">
            <span>✅ 253 テスト成功</span>
            <span>🎯 TDD開発プロセス</span>
            <span>🎉 Phase 3 完了 → Phase 4 準備完了</span>
          </div>
        </div>

        {/* イベント追加・編集フォーム */}
        <Modal
          isOpen={isFormOpen}
          onClose={handleFormCancel}
          title={editingEvent ? 'イベントを編集' : 'イベントを追加'}
        >
          <EventForm
            date={selectedDate || new Date()}
            event={editingEvent}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        </Modal>
      </div>
    </div>
  );
}
