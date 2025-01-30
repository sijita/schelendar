import { eventSchema } from '@/schemas/event-schema';
import { useEventsStore } from '@/store/use-events-store';
import { Event } from '@/types/event';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';
import useHandleParams from './use-handle-params';
import { useModalHandlingStore } from '@/store/use-modal-handling';

export default function useEditEvent() {
  const onCloseEditModal = useModalHandlingStore(
    (state) => state.setIsClosedModal
  );
  const { deleteParams, params } = useHandleParams();
  const editEvent = useEventsStore((state) => state.editEvent);
  const events = useEventsStore((state) => state.events);
  const eventToEdit = events.find((event) => event.id === params.get('id'));

  const onSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData);

    if (!eventToEdit) return;

    try {
      const parsedEvent = await eventSchema.safeParseAsync({
        ...data,
        id: eventToEdit?.id,
        date: format(new Date(`${data.date}T00:00:00`), 'dd-MM-yyyy', {
          locale: es,
        }),
      } as Partial<Event>);

      if (!parsedEvent.success) {
        const errorMessages = Object.entries(
          parsedEvent.error.flatten().fieldErrors
        )
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('. ');

        toast.error(errorMessages);
      }

      const success = editEvent(eventToEdit?.id, parsedEvent.data as Partial<Event>);

      if (!success) {
        toast.error('Ya existe un evento en ese horario.');
        return;
      }

      deleteParams();
      toast.success('Evento editado correctamente');
      onCloseEditModal('editModal');
    } catch {
      toast.error('Error al editar el evento. Por favor, intenta nuevamente.');
    }
  };

  return {
    onSubmit,
    eventToEdit,
  };
}
