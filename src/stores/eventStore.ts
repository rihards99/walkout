import { get, writable } from 'svelte/store';
import { EventType, type Events } from '../util/types';
import { getCurrentTimestamp } from '../util/util';
import { EVENTS } from '../configs/eventConfig';

export const initEventLoop = () => {
  setInterval(() => {
    const events = get(eventStore);
    let didUpdate = false;
    Object.keys(events).forEach(eventName => {
      const nextEventTriggerTime = events[eventName as EventType];
      if (nextEventTriggerTime == getCurrentTimestamp()) {
        didUpdate = true;
        EVENTS[eventName as EventType].effect();
        events[eventName as EventType] = getCurrentTimestamp() + EVENTS[eventName as EventType].cooldown;
      } else if (nextEventTriggerTime < getCurrentTimestamp()) {
        didUpdate = true;
        EVENTS[eventName as EventType].effect();
        events[eventName as EventType] = getCurrentTimestamp() + EVENTS[eventName as EventType].cooldown;
        // TODO: Event catchup code
      }
    })
  
    if (didUpdate) {
      eventStore.update(() => events);
    }
  }, 500)
}

const eventTypeArray = (Object.values(EventType) as Array<EventType>)
const defaultEventObject = eventTypeArray.reduce((acc, key) => {
  acc[key as EventType] = 0
  return acc;
}, {} as Events)

export const eventStore = writable<Events>(defaultEventObject);