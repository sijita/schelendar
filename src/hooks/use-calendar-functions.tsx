import { CalendarProps } from '@/components/calendar/calendar';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useState } from 'react';

export default function useCalendarFunctions({
  onSelectDate,
  events,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfWeek(startOfMonth(currentMonth));
  const monthEnd = endOfWeek(endOfMonth(currentMonth));
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  const handleYearChange = (year: string) => {
    setCurrentMonth(new Date(parseInt(year), currentMonth.getMonth()));
  };

  const hasEvents = (date: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
    );
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return {
    format,
    isSameMonth,
    isToday,
    selectedDate,
    currentMonth,
    setCurrentMonth,
    monthStart,
    monthEnd,
    monthDays,
    previousMonth,
    nextMonth,
    handleDateClick,
    handleYearChange,
    hasEvents,
    years,
  };
}
