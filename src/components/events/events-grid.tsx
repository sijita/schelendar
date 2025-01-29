'use client';
import useHandleParams from '@/hooks/use-handle-params';
import useTimeGridFunctions from '@/hooks/use-time-grid-functions';
import { getRandomColor } from '@/utils/constants';
import { Button, Tooltip } from '@heroui/react';
import { IconCalendar, IconPencil, IconX } from '@tabler/icons-react';
import { es } from 'date-fns/locale';

export function EventsGrid() {
  const { onOpenEvent } = useHandleParams();
  const {
    hours,
    getEventsForHour,
    currentDate,
    addDays,
    startOfCurrentWeek,
    isToday,
    isSameMonth,
    indexOfEventHour,
    deleteEvent,
    format,
  } = useTimeGridFunctions();

  return (
    <div className="w-full overflow-auto flex flex-col max-h-screen">
      <div className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] max-xl:w-[80rem] items-center gap-3 pb-5 bg-white px-5">
        <Button className="text-background" variant="light" isDisabled>
          <IconCalendar size={20} />
        </Button>
        {Array.from({ length: 7 }).map((_, i) => {
          const date = addDays(startOfCurrentWeek, i);
          return (
            <Button
              key={i}
              className={`gap-2 text-center text-black ${
                isToday(date)
                  ? 'bg-primary'
                  : !isSameMonth(date, currentDate)
                  ? 'bg-gray-300 text-gray-500'
                  : 'bg-[#F5F6F7]'
              }`}
            >
              <div className="text-sm capitalize">
                {format(date, 'EEE', { locale: es })}
              </div>
              <div className="text-xl font-semibold">{date.getDate()}</div>
            </Button>
          );
        })}
      </div>
      <div className="bg-[#F5F6F7] p-5 rounded-b-2xl max-xl:w-[80rem] min-w-full">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[80px_repeat(7,minmax(0,1fr))] gap-5 py-2 border-b border-gray-300"
          >
            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">
                {hour}:00
                <span className="text-xs">{hour > 11 ? 'pm' : 'am'}</span>
              </span>
            </div>
            {getEventsForHour(hour).map((event, i) => {
              const { bgColor, textColor } = getRandomColor();
              return (
                <div
                  key={i}
                  className={`flex flex-col gap-2 text-sm rounded-2xl p-5 relative`}
                  style={{
                    gridColumnStart: indexOfEventHour(event) + 2,
                    backgroundColor: bgColor,
                    color: textColor,
                  }}
                >
                  <Button
                    className="absolute -top-1 -right-1 bg-background"
                    radius="full"
                    size="sm"
                    isIconOnly
                    onPress={() => deleteEvent(event.id)}
                  >
                    <IconX size={15} />
                  </Button>
                  <Tooltip content={event.title}>
                    <span className="font-semibold capitalize truncate">
                      {event.title}
                    </span>
                  </Tooltip>
                  <Tooltip content={event.description}>
                    <p className="text-black text-sm truncate">
                      {event.description}
                    </p>
                  </Tooltip>
                  <Button
                    className="text-sm ml-auto"
                    variant="light"
                    size="sm"
                    isIconOnly
                    style={{
                      color: textColor,
                    }}
                    onPress={() => {
                      onOpenEvent(event.id);
                    }}
                  >
                    <IconPencil size={15} />
                  </Button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
