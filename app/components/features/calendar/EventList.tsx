import { CalendarEvent } from '@/app/types/calendar';
import { EventItem } from './EventItem';

interface EventListProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onEventEdit?: (event: CalendarEvent) => void;
  onEventDelete?: (event: CalendarEvent) => void;
}

export function EventList({
  events,
  onEventClick,
  onEventEdit,
  onEventDelete
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        イベントがありません
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          onClick={onEventClick}
          onEdit={onEventEdit}
          onDelete={onEventDelete}
        />
      ))}
    </div>
  );
}