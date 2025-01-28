'use client';
import useAddEvent from '@/hooks/use-add-event';
import { useCurrentDateStore } from '@/store/use-current-date-store';
import { Input, Button, Textarea } from '@heroui/react';
import { IconCalendar, IconClock } from '@tabler/icons-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function AddEventForm() {
  const { onSubmit } = useAddEvent();
  const { currentDate } = useCurrentDateStore((state) => state);
  const formattedDate = currentDate && format(currentDate, 'yyyy-MM-dd');

  return (
    <form action={onSubmit} className="flex flex-col gap-3">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1">
          <Button variant="light" isIconOnly isDisabled>
            <IconCalendar className="text-primary" />
          </Button>
          <input
            className="hidden"
            type="date"
            name="date"
            defaultValue={formattedDate}
          />
          <span className="text-lg text-center font-medium capitalize">
            {format(new Date(`${formattedDate}T00:00:00`), 'EEE d', {
              locale: es,
            })}
          </span>
        </div>
        <Input
          name="hour"
          label="Hora"
          startContent={<IconClock className="w-4 h-4 text-gray-400" />}
          type="time"
          variant="flat"
          isRequired
        />
      </div>
      <Input
        name="title"
        label="Título"
        placeholder="Nombre del evento"
        variant="flat"
        min={5}
        isRequired
      />
      <Textarea
        name="description"
        label="Descripción"
        placeholder="Lorem ipsum dolor sit amet"
        variant="flat"
        min={5}
        isRequired
      />
      <Button className="w-full mb-1" color="primary" type="submit">
        Añadir
      </Button>
    </form>
  );
}
