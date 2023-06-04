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

export const PICKUPS: PickupConfig = {
  [PickupType.Lumber]: {
    onPickup: (id: string) => {
      const pickup = get(pickupStore).find(p => p.id == id)
      console.log("🚀 ~ pickup:", pickup);
      
      if (pickup && isPointInRange(pickup.coords)) {
        addResource(ResourceType.Lumber, 1);
        pickupStore.update(pickups => pickups.filter(p => p.id !== id));
      }
    },
    icon: logImage
  },
  [PickupType.Gold]: {
    onPickup: (id: string) => {
      const pickup = get(pickupStore).find(p => p.id == id)
      console.log("🚀 ~ pickup:", pickup);
      
      if (pickup && isPointInRange(pickup.coords)) {
        addResource(ResourceType.Gold, 1);
        pickupStore.update(pickups => pickups.filter(p => p.id !== id));
      }
    },
    icon: goldImage
  },
  [PickupType.Mana]: {
    onPickup: (id: string) => {
      const pickup = get(pickupStore).find(p => p.id == id)
      console.log("🚀 ~ pickup:", pickup);
      
      if (pickup && isPointInRange(pickup.coords)) {
        addResource(ResourceType.Mana, 1);
        pickupStore.update(pickups => pickups.filter(p => p.id !== id));
      }
    },
    icon: manaImage
  }
}