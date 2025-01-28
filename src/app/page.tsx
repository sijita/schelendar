import Aside from '@/components/ui/aside';
import Events from '@/components/events/events';
import { EditEventModal } from '@/components/modals/edit-event-modal';
import { AddEventModal } from '@/components/modals/add-event-modal';

export default function Home() {
  return (
    <main className="p-[10px] flex flex-col lg:flex-row gap-3">
      <AddEventModal />
      <EditEventModal />
      <Aside />
      <Events />
    </main>
  );
}
