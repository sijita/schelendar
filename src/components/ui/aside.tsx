'use client';
import { Avatar, Badge, Button, Input } from '@heroui/react';
import { IconCalendar, IconSearch } from '@tabler/icons-react';
import Calendar from '@/components/calendar/calendar';
import { useEventsStore } from '@/store/use-events-store';
import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Aside() {
  const [search, setSearch] = useState('');
  const events = useEventsStore((state) => state.events);

  const results = !search
    ? null
    : events.filter((item) =>
        item.title
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes(search.replace(/\s+/g, '').toLowerCase())
      );

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
      <div className="flex flex-col gap-3">
        <Input
          classNames={{
            input: 'placeholder:text-sm',
            inputWrapper: 'bg-[#181818] rounded-2xl',
          }}
          placeholder="Buscar evento"
          endContent={<IconSearch size={20} className="text-primary" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="lg"
        />
        {results && (
          <ul className="flex flex-col gap-5 p-5 bg-[#181818] rounded-2xl max-h-[20rem] overflow-auto">
            {results.map((item, i) => {
              const [day, month, year] = item.date.split('-');
              const formattedDate = `${year}-${month}-${day}`;
              return (
                <li
                  key={item.id}
                  className={`flex items-center gap-3 border-b border-gray-600 ${
                    i === results.length - 1 && 'border-b-0'
                  } pb-2`}
                >
                  <div className="flex flex-col">
                    <p className="text-primary capitalize">
                      {format(new Date(`${formattedDate}T00:00:00`), 'MMM d', {
                        locale: es,
                      })}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.hour}
                      {Number(item.hour.split(':')[0]) > 11 ? 'pm' : 'am'}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
