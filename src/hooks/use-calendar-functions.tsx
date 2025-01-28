import {
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
import { useState } from 'react';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
  events: { date: Date }[];
}

export default function useCalendarFunctions({
  onSelectDate,
  events,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    setSelectedDate(date);
    onSelectDate(date);
  };

  const handleYearChange = (year: string) =>
    setCurrentDate(new Date(parseInt(year), currentDate.getMonth()));

  const hasEvents = (date: Date) => {
    return events.some(
      (event: { date: Date }) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  return {
    goToToday,
    goToNextWeek,
    goToPreviousWeek,
    getCurrentWeekDays,
    format,
    isSameMonth,
    isToday,
    selectedDate,
    currentDate,
    setCurrentDate,
    monthDays,
    previousMonth,
    nextMonth,
    handleDateClick,
    handleYearChange,
    hasEvents,
    years,
  };
}
