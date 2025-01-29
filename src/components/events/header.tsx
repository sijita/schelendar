'use client';
import useCalendarFunctions from '@/hooks/use-calendar-functions';
import { useEventsStore } from '@/store/use-events-store';
import { Button, Tab, Tabs } from '@heroui/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface HeaderProps {
  view: 'month' | 'week' | 'day';
  onAddEvent?: () => void;
}

export function Header({ view }: HeaderProps) {
  const { events } = useEventsStore((state) => state);
  const { goToToday, currentDate, goToNextWeek, goToPreviousWeek, isToday } =
    useCalendarFunctions({
      events,
    });

  return (
    <div className="p-5 flex flex-col gap-10 bg-[#FFF] rounded-t-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="w-full sm:w-auto flex justify-between gap-5">
          <h1 className="text-2xl font-semibold text-black capitalize text-pretty">
            {currentDate
              .toLocaleDateString('es-CO', {
                month: 'long',
                year: 'numeric',
              })
              .replace(' de ', ', ')}
          </h1>
          <div className="flex sm:hidden items-center gap-5">
            <div className="flex gap-1">
              <Button
                className="bg-[#F5F6F7] text-black"
                onPress={goToPreviousWeek}
                isIconOnly
              >
                <IconChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                className={`font-medium text-black ${
                  new Date().getDate() ? 'bg-primary' : ''
                }`}
                onPress={goToToday}
                color="primary"
                variant="ghost"
              >
                Hoy
              </Button>
              <Button
                className="bg-[#F5F6F7] text-black"
                onPress={goToNextWeek}
                isIconOnly
              >
                <IconChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <Tabs
          classNames={{
            tabContent: 'group-data-[selected=true]:text-black',
            cursor:
              'group-data-[selected=true]:bg-white group-data-[selected=true]:text-black',
            tabList: 'bg-[#F5F6F7] w-full sm:w-auto',
            base: 'w-full sm:w-auto',
          }}
          selectedKey={view}
        >
          <Tab key="month" title="Mes" />
          <Tab key="week" title="Semana" />
          <Tab key="day" title="Día" />
        </Tabs>
        <div className="hidden sm:flex items-center gap-5">
          <div className="flex gap-1">
            <Button
              className="bg-[#F5F6F7] text-black"
              onPress={goToPreviousWeek}
              isIconOnly
            >
              <IconChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              className={`font-medium text-black ${
                isToday(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()
                  )
                ) && 'bg-primary'
              }`}
              color="primary"
              variant="ghost"
              onPress={goToToday}
            >
              Hoy
            </Button>
            <Button
              className="bg-[#F5F6F7] text-black"
              onPress={goToNextWeek}
              isIconOnly
            >
              <IconChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
