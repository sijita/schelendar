import { useCurrentDateStore } from '@/store/use-current-date-store';
import type { Event } from '@/types/event';
import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import { es } from 'date-fns/locale';

export default function useCalendarFunctions({ events }: { events: Event[] }) {
  const currentDate = useCurrentDateStore((state) => state.currentDate);
  const setCurrentDate = useCurrentDateStore((state) => state.setCurrentDate);

  const monthDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const getCurrentWeekDays = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const goToToday = () => setCurrentDate(new Date());
  const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  const previousMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );

  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
  };

  const handleYearChange = (year: string) =>
    setCurrentDate(new Date(parseInt(year), currentDate.getMonth()));

  const hasEvents = (date: Date) =>
    events.some((event) => event.date === format(date, 'dd-MM-yyyy'));

  return {
    es,
    goToToday,
    goToNextWeek,
    goToPreviousWeek,
    getCurrentWeekDays,
    format,
    isSameMonth,
    isToday,
    currentDate,
    setCurrentDate,
    monthDays,
    previousMonth,
    nextMonth,
    handleDateClick,
    handleYearChange,
    hasEvents,
    years,
    startOfWeek,
    addDays,
  };
}
