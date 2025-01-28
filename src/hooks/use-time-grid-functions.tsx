import { useEventsStore } from '@/store/use-events-store';
import { format } from 'date-fns';
import useCalendarFunctions from './use-calendar-functions';
import { Event } from '@/types/event';

export default function useTimeGridFunctions() {
  const events = useEventsStore((state) => state.events);
  const deleteEvent = useEventsStore((state) => state.removeEvent);

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
  const startOfCurrentWeek = startOfWeek(currentDate, {
    weekStartsOn: 0,
  });

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

  return {
    currentDate,
    startOfCurrentWeek,
    weekDays,
    hours,
    indexOfEventHour,
    getEventsForHour,
    addDays,
    isSameMonth,
    isToday,
    deleteEvent,
    format,
  };
}
