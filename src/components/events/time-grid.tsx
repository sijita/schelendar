'use client';
import useCalendarFunctions from '@/hooks/use-calendar-functions';
import { useEventsStore } from '@/store/use-events-store';
import { Event } from '@/types/event';
import { Button } from '@heroui/react';
import { IconCalendar } from '@tabler/icons-react';
import { format } from 'date-fns';

export function TimeGrid() {
  const events = useEventsStore((state) => state.events);
  const {
    getCurrentWeekDays,
    currentDate,
    startOfWeek,
    addDays,
    isSameMonth,
    isToday,
  } = useCalendarFunctions({
    events,
  });

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 });

  const weekDays = getCurrentWeekDays().map((d) => d.getDate());
  const hours = Array.from({ length: 18 }, (_, i) => i + 5); // 5am to 11pm
  const indexOfEventHour = (event: Event) =>
    weekDays.indexOf(Number(event.date.split('-')[0]));

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventHour = event.hour.startsWith('0')
        ? event.hour.slice(1)
        : event.hour;

      const sameDay =
        weekDays.includes(Number(event.date.split('-')[0])) &&
        event.date.split('-')[1] === format(currentDate, 'MM').toString() &&
        event.date.split('-')[2] === format(currentDate, 'yyyy').toString();

      return eventHour === `${hour}:00` && sameDay;
    });
  };

  return (
    <div className="w-full overflow-x-auto flex flex-col">
      <div className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] max-sm:w-[60rem] items-center gap-3 pb-5 bg-white px-5">
        <Button className="text-background" variant="light" isDisabled>
          <IconCalendar size={20} />
        </Button>
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day, i) => {
          const date = addDays(startOfCurrentWeek, i);
          return (
            <Button
              key={day}
              className={`gap-2 text-center text-black ${
                isToday(date)
                  ? 'bg-primary'
                  : !isSameMonth(date, currentDate)
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-[#F5F6F7]'
              }`}
            >
              <div className="text-sm">{format(date, 'EEE')}</div>
              <div className="text-xl font-semibold">{date.getDate()}</div>
            </Button>
          );
        })}
      </div>
      <div className="bg-[#F5F6F7] p-5 rounded-b-2xl w-[60rem] min-w-full">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] gap-5 py-2 border-b border-gray-300"
          >
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">{hour}:00</span>
            </div>
            {getEventsForHour(hour).map((event, i) => (
              <div
                key={i}
                className="flex flex-col bg-background text-white text-sm rounded-xl p-5"
                style={{ gridColumnStart: indexOfEventHour(event) + 2 }}
              >
                <span className="font-medium capitalize">{event.title}</span>
                <p className="text-gray-300">{event.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
