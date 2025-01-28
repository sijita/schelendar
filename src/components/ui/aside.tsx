'use client';
import { Avatar, Badge, Button } from '@heroui/react';
import { IconCalendar } from '@tabler/icons-react';
import Calendar from '@/components/calendar/calendar';
import { useEventsStore } from '@/store/use-events-store';

export default function Aside() {
  const events = useEventsStore((state) => state.events);

  return (
    <aside className="rounded-3xl lg:w-[300px] flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 p-5 bg-[#181818] rounded-2xl">
        <div className="flex items-center gap-2">
          <Avatar
            src="https://api.dicebear.com/9.x/big-smile/svg?seed=SIJITA"
            className="w-10 h-10"
          />
          <div>
            <p className="text-white text-sm font-medium">Sijita</p>
            <p className="text-gray-400 text-xs">Software Engineer</p>
          </div>
        </div>
        <Badge
          className="text-xs"
          color="primary"
          content={events.length}
          shape="circle"
        >
          <Button isIconOnly radius="full" variant="flat">
            <IconCalendar size={20} />
          </Button>
        </Badge>
      </div>
      <Calendar events={events} />
    </aside>
  );
}
