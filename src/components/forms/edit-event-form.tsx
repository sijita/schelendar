import useEditEvent from '@/hooks/use-edit-event';
import { Button, Input, Spinner, Textarea } from '@heroui/react';
import { IconCalendar, IconClock } from '@tabler/icons-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function EditEventForm() {
  const { onSubmit, eventToEdit: event } = useEditEvent();

  if (!event)
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner />
      </div>
    );

  const dateString = event?.date;
  const [day, month, year] = dateString.split('-');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <form
      action={(formData) => onSubmit(formData, event.id)}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1">
          <Button variant="light" isIconOnly isDisabled>
            <IconCalendar className="text-primary" />
          </Button>
          <input
            className="hidden"
            type="date"
            name="date"
            defaultValue={`${year}-${month}-${day}`}
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
          defaultValue={event.hour}
          isRequired
        />
      </div>
      <Input
        name="title"
        label="Título"
        placeholder="Nombre del evento"
        variant="flat"
        min={5}
        defaultValue={event.title}
        isRequired
      />
      <Textarea
        name="description"
        label="Descripción"
        placeholder="Lorem ipsum dolor sit amet"
        variant="flat"
        min={5}
        defaultValue={event.description}
        isRequired
      />
      <Button className="w-full mb-1" color="primary" type="submit">
        Editar
      </Button>
    </form>
  );
}
