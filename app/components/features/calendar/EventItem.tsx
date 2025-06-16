import { CalendarEvent } from '@/app/types/calendar';

interface EventItemProps {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
}

export function EventItem({
  event,
  onClick,
  onEdit,
  onDelete
}: EventItemProps) {
  const getTimeDisplay = () => {
    if (event.startTime && event.endTime) {
      return `${event.startTime} - ${event.endTime}`;
    }
    if (event.startTime) {
      return event.startTime;
    }
    return null;
  };

  const getAriaLabel = () => {
    const timeDisplay = getTimeDisplay();
    return timeDisplay ? `${event.title} ${timeDisplay}` : event.title;
  };

  return (
    <div
      className="border border-gray-200 rounded-lg p-3 relative group"
      style={{ borderColor: event.color }}
    >
      <div className="flex justify-between items-start">
        <button
          className="flex-1 text-left group-hover:bg-gray-50 rounded p-2 -m-2 transition-colors"
          onClick={() => onClick?.(event)}
          aria-label={getAriaLabel()}
        >
          <div>
            <h3 className="font-semibold text-gray-900">{event.title}</h3>
            {getTimeDisplay() && (
              <p className="text-sm text-gray-600">
                {getTimeDisplay()}
              </p>
            )}
            {event.description && (
              <p className="text-sm text-gray-700 mt-1">{event.description}</p>
            )}
          </div>
        </button>

        <div className="flex gap-1 ml-2">
          {onEdit && (
            <button
              aria-label="イベントを編集"
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
              onClick={() => onEdit(event)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}

          {onDelete && (
            <button
              aria-label="イベントを削除"
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              onClick={() => onDelete(event)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}