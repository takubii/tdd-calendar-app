import { IconButton } from '@/app/components/ui/IconButton';
import { Button } from '@/app/components/ui/Button';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  // 年月を日本語形式でフォーマット
  const formatYearMonth = (date: Date): string => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  };

  // アイコンコンポーネント
  const ChevronLeftIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );

      return (
    <div
      className="flex items-center justify-between p-4 bg-white border-b border-gray-200"
    >
      {/* 前月ボタン */}
      <IconButton
        aria-label="前月"
        onClick={onPrevMonth}
        variant="ghost"
        size="md"
        icon={<ChevronLeftIcon />}
      />

      {/* 年月表示 */}
      <h1 className="text-xl font-semibold text-gray-900">
        {formatYearMonth(currentDate)}
      </h1>

      {/* ボタングループ */}
      <div className="flex items-center gap-2">
        {/* 今日ボタン */}
        <Button
          onClick={onToday}
          variant="secondary"
          size="sm"
          className="text-blue-600 bg-blue-50 hover:bg-blue-100"
        >
          今日
        </Button>

        {/* 次月ボタン */}
        <IconButton
          aria-label="次月"
          onClick={onNextMonth}
          variant="ghost"
          size="md"
          icon={<ChevronRightIcon />}
        />
      </div>
    </div>
  );
}