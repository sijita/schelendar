import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Event } from '@/types/event';

interface EventsState {
  events: Event[];
  addEvent: (events: Event) => boolean;
  editEvent: (id: string, event: Partial<Event>) => boolean;
  removeEvent: (id: string) => void;
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      events: [],
      addEvent: (newEvent: Event) => {
        const { events } = get();

        const hasConflict = events.some((event: Event) => {
          const isSameDay = event.date === newEvent.date;
          const isSameHour = event.hour === newEvent.hour;

          const isOverlapping = isSameDay && isSameHour;

          return isOverlapping;
        });

        if (hasConflict) return false;

        set((state) => ({ events: [...state.events, newEvent] }));

        return true;
      },
      editEvent: (id: string, updatedEvent: Partial<Event>) => {
        const state = get();
        const currentEvent = state.events.find((event) => event.id === id);

        if (!currentEvent) return false;

        const updatedEventFull = { ...currentEvent, ...updatedEvent };

        const hasConflict = state.events.some((event) => {
          if (event.id === id) return false;

          const isSameDay = event.date === updatedEvent.date;
          const isSameHour = event.hour === updatedEvent.hour;

          const isOverlapping = isSameDay && isSameHour;

          return isOverlapping;
        });

        if (hasConflict) return false;

        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? updatedEventFull : event
          ),
        }));

        return true;
      },
      removeEvent: (id: string) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
    }),
    {
      name: 'events-storage',
    }
  )
);
