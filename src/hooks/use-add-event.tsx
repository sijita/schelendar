import { eventSchema } from '@/schemas/event-schema';
import { useEventsStore } from '@/store/use-events-store';
import { Event } from '@/types/event';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function useAddEvent({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  const { addEvent } = useEventsStore.getState();

  const onSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData);

    try {
      const parsedEvent = await eventSchema.safeParseAsync({
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        date: format(new Date(`${data.date}T00:00:00`), 'dd-MM-yyyy', {
          locale: es,
        }),
      } as Event);

      if (!parsedEvent.success) {
        const errorMessages = Object.entries(
          parsedEvent.error.flatten().fieldErrors
        )
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('. ');

        toast.error(errorMessages);
      }

      const success = addEvent(parsedEvent.data as Event);

      if (!success) {
        toast.error('Ya existe un evento en ese horario.');
        return;
      }

      toast.success('Evento creado correctamente');
      onCloseModal();
    } catch {
      toast.error('Error al crear el evento. Por favor, intenta nuevamente.');
    }
  };

  return {
    onSubmit,
  };
}
