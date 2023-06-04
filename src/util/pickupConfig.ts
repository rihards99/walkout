import { get } from 'svelte/store';

import { PickupType, ResourceType } from "./types"
import logImage from '$lib/images/pickups/log.svg';
import goldImage from '$lib/images/pickups/gold.svg';
import manaImage from '$lib/images/pickups/mana.svg';
import { addResource } from "../stores/resourcesStore";
import { pickupStore } from "../stores/pickupStore";
import { isPointInRange } from './util';

// Make the keys comply to BuildingType
type PickupConfig = {
  [key in PickupType]: {
    icon: string,
    onPickup: (id: string) => void,
  }
};

const onResourcePickup = (id: string, resourceType: ResourceType) => {
  const pickup = get(pickupStore).find(p => p.id == id)
  console.log("🚀 ~ pickup:", pickup);
  
  if (pickup) {
    if (!isPointInRange(pickup.coords)) {
      alert("Pickup out of range");
      return;
    }
    addResource(resourceType, 1);
    pickupStore.update(pickups => pickups.filter(p => p.id !== id));
  }
}

export const PICKUPS: PickupConfig = {
  [PickupType.Lumber]: {
    onPickup: (id: string) => onResourcePickup(id, ResourceType.Lumber),
    icon: logImage
  },
  [PickupType.Gold]: {
    onPickup: (id: string) => onResourcePickup(id, ResourceType.Gold),
    icon: goldImage
  },
  [PickupType.Mana]: {
    onPickup: (id: string) => onResourcePickup(id, ResourceType.Mana),
    icon: manaImage
  }
}