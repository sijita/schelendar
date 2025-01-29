import Aside from '@/components/ui/aside';
import Events from '@/components/events/events';
import { EditEventModal } from '@/components/modals/edit-event-modal';
import { AddEventModal } from '@/components/modals/add-event-modal';
import { Suspense } from 'react';
import { Spinner } from '@heroui/react';

export default function Home() {
  return (
    <main className="p-[10px] flex flex-col lg:flex-row gap-3">
      <AddEventModal />
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <EditEventModal />
      </Suspense>
      <Aside />
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Events />
      </Suspense>
    </main>
  );
}
