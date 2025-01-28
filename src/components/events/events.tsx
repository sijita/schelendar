import { Header } from './header';
import { TimeGrid } from './time-grid';

export default function Events() {
  return (
    <div className="w-full flex-1 flex flex-col overflow-auto">
      <Header view="week" />
      <TimeGrid />
    </div>
  );
}
