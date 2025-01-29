import { Header } from './header';
import { EventsGrid } from './events-grid';

export default function Events() {
  return (
    <div className="w-full flex-1 flex flex-col overflow-auto">
      <Header view="week" />
      <EventsGrid />
    </div>
  );
}
