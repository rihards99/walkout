import { get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Point, PickupType, Pickup } from '../util/types';
import { addResource } from './resourcesStore';
import { PICKUPS } from '../util/pickupConfig';

const getCurrentTimestamp = () => (new Date).getTime() / 1000;

export const pickupStore = writable<Pickup[]>([]);

export const takePickup = (pickupId: string) => {
  console.log("PICKUP ", pickupId);
  const pickups = get(pickupStore)
  const pickup = pickups.find(b => b.id === pickupId);

  if (pickup) {
    PICKUPS[pickup.type].onPickup(pickupId)
    pickupStore.update(() => pickups.filter(p => p.id !== pickup.id))
  }
}

export const createPickup = (coords: Point, type: PickupType) => {
  console.log("🚀 ~ createPickup:", coords, type); 
  pickupStore.update(pickups => {
    return [...pickups, {id: uuidv4(), coords, type}];
  })
}
