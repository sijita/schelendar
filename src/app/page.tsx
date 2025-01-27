import Aside from '@/components/ui/aside';
import Events from '@/components/events/events';

export default function Home() {
  return (
    <main className="p-[10px] flex flex-col lg:flex-row gap-3">
      <Aside />
      <Events />
    </main>
  );
}
