import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Point, HostileBuilding, HostileBuildingType } from '../util/types';

export const hostileBuildingStore = writable<HostileBuilding[]>([]);

export const addHostileBuilding = (coords: Point, type: HostileBuildingType) => {
  hostileBuildingStore.update(hostileBuildings => {
    return [...hostileBuildings, {id: uuidv4(), coords, type}];
  })
}

export const destroyHostileBuidling = (id: string) => {
  hostileBuildingStore.update(hostileBuildings => {
    return hostileBuildings.filter(hostileBuilding => hostileBuilding.id !== id);
  })
}
