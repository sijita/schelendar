import { AnimatePresence, motion } from 'framer-motion';
import useCalendarFunctions from '@/hooks/use-calendar-functions';
import { es } from 'date-fns/locale';
import { Button, Select, SelectItem } from '@heroui/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { EventModal } from '@/components/modals/event-modal';
import { useState } from 'react';
import type { Event } from '@/types/event';

export default function Calendar({ events }: { events: Event[] }) {
  const {
    isToday,
    format,
    isSameMonth,
    currentDate,
    handleDateClick,
    monthDays,
    previousMonth,
    nextMonth,
    years,
    handleYearChange,
    hasEvents,
  } = useCalendarFunctions({ events });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <EventModal
        dateValue={currentDate ? format(currentDate, 'yyyy-MM-dd') : ''}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="bg-[#181818] rounded-xl p-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <motion.h2
              key={format(currentDate, 'MMMM', { locale: es })}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold capitalize"
            >
              {format(currentDate, 'MMMM', { locale: es })}
            </motion.h2>
            <Select
              selectedKeys={[currentDate.getFullYear().toString()]}
              value={currentDate.getFullYear().toString()}
              onChange={(e) => handleYearChange(e.target.value)}
              className="w-[95px]"
              classNames={{
                value: 'font-medium',
                trigger: 'bg-transparent',
              }}
              size="sm"
            >
              {years.map((year) => (
                <SelectItem key={year.toString()} value={year.toString()}>
                  {year.toString()}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-background"
              size="sm"
              onPress={previousMonth}
              isIconOnly
            >
              <IconChevronLeft size={20} />
            </Button>
            <Button
              className="bg-background"
              size="sm"
              onPress={nextMonth}
              isIconOnly
            >
              <IconChevronRight size={20} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <div key={day} className="text-gray-400">
              {day}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDate.toString()}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-7 gap-1"
          >
            {monthDays.map((date, i) => (
              <motion.button
                key={date.toString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  handleDateClick(date);
                  setIsModalOpen(true);
                }}
                className={`h-[40px] rounded-lg flex flex-col items-center justify-center relative transition-all duration-200 ${
                  !isSameMonth(date, currentDate) && 'text-gray-500'
                } ${
                  isToday(date) && 'bg-primary text-black hover:text-white'
                } hover:bg-background`}
              >
                <span className="text-sm">{format(date, 'd')}</span>
                {hasEvents(date) && (
                  <div
                    className={`absolute bottom-1 w-1 h-1 rounded-full z-50 ${
                      hasEvents(date) && !isToday(date)
                        ? 'bg-primary'
                        : 'bg-background'
                    }`}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
