import { cn } from '@/app/lib/utils';
import { CalendarEvent } from '@/app/types/calendar';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isWeekend: boolean;
  events?: CalendarEvent[];
  onSelect: (date: Date) => void;
  onAddEvent?: (date: Date) => void;
  className?: string;
}

export function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  isSelected,
  isWeekend,
  events = [],
  onSelect,
  onAddEvent,
  className,
}: CalendarDayProps) {
  const day = date.getDate();
  const hasEvents = events.length > 0;

  // aria-labelの作成
  const createAriaLabel = () => {
    const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${day}日`;
    const modifiers = [];

    if (isToday) modifiers.push('今日');
    if (isSelected) modifiers.push('選択中');
    if (hasEvents) modifiers.push(`イベント${events.length}件`);

    return modifiers.length > 0 ? `${dateStr} (${modifiers.join(', ')})` : dateStr;
  };

  // スタイルクラスの決定（優先順位: 選択中 > 今日 > 週末 > その他）
  const getStyleClasses = () => {
    const baseClasses = 'w-full h-12 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-col items-center justify-center relative';

    if (isSelected) {
      return cn(baseClasses, 'bg-blue-600 text-white hover:bg-blue-700');
    }

    if (isToday) {
      return cn(baseClasses, 'bg-blue-100 text-blue-800 hover:bg-blue-200');
    }

    if (!isCurrentMonth) {
      return cn(baseClasses, 'text-gray-400');
    }

    if (isWeekend) {
      return cn(baseClasses, 'text-red-600');
    }

    return cn(baseClasses, 'text-gray-900');
  };

  const handleClick = () => {
    onSelect(date);
  };

  const handleDoubleClick = () => {
    if (onAddEvent) {
      onAddEvent(date);
    }
  };

  return (
    <button
      type="button"
      className={cn(getStyleClasses(), className)}
      aria-label={createAriaLabel()}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <span>{day}</span>
      {hasEvents && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {events.length}
        </span>
      )}
    </button>
  );
}