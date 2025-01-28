import { Input, Button, Textarea } from '@heroui/react';
import { IconCalendar, IconClock } from '@tabler/icons-react';

export default function EventsForm({ dateValue }: { dateValue: string }) {
  return (
    <form className="flex flex-col gap-3">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-1">
          <Button variant="light" isIconOnly isDisabled>
            <IconCalendar className="text-primary" />
          </Button>
          <span className="text-lg text-center font-medium capitalize">
            {new Date(dateValue).toLocaleDateString('es-CO', {
              day: 'numeric',
              weekday: 'short',
            })}
          </span>
        </div>
        <Input
          label="Hora"
          startContent={<IconClock className="w-4 h-4 text-gray-400" />}
          type="time"
          variant="flat"
        />
      </div>
      <Input label="Título" placeholder="Nombre del evento" variant="flat" />
      <Textarea
        label="Descripción"
        placeholder="Lorem ipsum dolor sit amet"
        variant="flat"
      />
      <Button
        className="w-full mb-1"
        color="primary"
        onPress={() => console.log('submit')}
        type="submit"
      >
        Añadir
      </Button>
    </form>
  );
}
