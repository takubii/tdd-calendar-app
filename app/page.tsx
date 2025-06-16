'use client';

import { useState } from 'react';
import { CalendarGrid } from '@/app/components/features/calendar/CalendarGrid';

export default function Home() {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
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

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
            </h2>
            {selectedDate && (
              <p className="text-gray-600">
                選択中: {selectedDate.getFullYear()}年
                {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
              </p>
            )}
          </div>

          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex gap-4 text-sm text-gray-500">
            <span>✅ 130 テスト成功</span>
            <span>🎯 TDD開発プロセス</span>
            <span>📦 Phase 2: カレンダー表示</span>
          </div>
        </div>
      </div>
    </div>
  );
}
