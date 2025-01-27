'use client';
import useCalendarFunctions from '@/hooks/use-calendar-functions';

interface TimeGridProps {
  events: { date: Date; title: string }[];
}

export function TimeGrid({ events }: TimeGridProps) {
  const { selectedDate } = useCalendarFunctions({
    onSelectDate: () => {},
    events,
  });
  const hours = Array.from({ length: 18 }, (_, i) => i + 5); // 5am to 11pm

  const getEventsForHour = (hour: number) => {
    if (!selectedDate) return [];

    return events.filter((event) => {
      const eventHour = event.date.getHours();

      const sameDay =
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear();

      return eventHour === hour && sameDay;
    });
  };

  return (
    <div className="flex-shrink-0 w-full bg-[#F5F6F7] p-5 rounded-b-2xl">
      <div className="grid grid-cols-1 gap-1">
        {hours.map((hour) => (
          <div
            key={hour}
            className={`grid grid-cols-[80px_1fr] gap-5 py-2 border-b ${
              hour === 22 && 'border-b-0'
            }`}
          >
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">{hour}:00</span>
            </div>
            <div className="min-h-[40px] relative group">
              {getEventsForHour(hour).map((event, index) => (
                <div
                  key={index}
                  className="absolute inset-x-0 bg-calendar-accent rounded-lg p-2 text-sm"
                >
                  {event.title}
                </div>
              ))}
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
