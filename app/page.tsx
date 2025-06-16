import { CalendarGrid } from '@/app/components/features/calendar/CalendarGrid';

export default function Home() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📅 カレンダーアプリ
          </h1>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {currentYear}年{currentMonth + 1}月
            </h2>
            <CalendarGrid
              year={currentYear}
              month={currentMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
