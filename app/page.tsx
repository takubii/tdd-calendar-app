'use client';

import { CalendarGrid } from '@/app/components/features/calendar/CalendarGrid';
import { CalendarHeader } from '@/app/components/features/calendar/CalendarHeader';
import { useCalendar } from '@/app/hooks/useCalendar';

export default function Home() {
  const {
    currentDate,
    selectedDate,
    selectDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  const handleDateSelect = (date: Date) => {
    selectDate(date);
  };

  const handlePrevMonth = () => {
    goToPreviousMonth();
  };

  const handleNextMonth = () => {
    goToNextMonth();
  };

  const handleToday = () => {
    goToToday();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📅 TDD カレンダーアプリ
          </h1>
          <p className="text-gray-600">
            テスト駆動開発で作成されたカレンダーアプリケーション
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* カレンダーヘッダー */}
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
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
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex gap-4 text-sm text-gray-500">
            <span>✅ 191 テスト成功</span>
            <span>🎯 TDD開発プロセス</span>
            <span>🎉 Phase 2 完了: カレンダー表示</span>
          </div>
        </div>
      </div>
    </div>
  );
}
