import { get } from 'svelte/store';

import { PickupType, ResourceType } from "../util/types"
import { addResource } from "../stores/resourcesStore";
import { pickupStore } from "../stores/pickupStore";
import { isPointInRange } from '../util/util';
import { RESOURCES } from './resourceConfig';

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
    icon: RESOURCES[ResourceType.Lumber].icon
  },
  [PickupType.Gold]: {
    onPickup: (id: string) => onResourcePickup(id, ResourceType.Gold),
    icon: RESOURCES[ResourceType.Gold].icon
  },
  [PickupType.Mana]: {
    onPickup: (id: string) => onResourcePickup(id, ResourceType.Mana),
    icon: RESOURCES[ResourceType.Mana].icon
  }
}