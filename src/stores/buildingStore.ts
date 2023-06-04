import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Point, Building, BuildingType } from '../util/types';

export const buildingsStore = writable<Building[]>([]);

export const addBuilding = (coords: Point, type: BuildingType) => {
  buildingsStore.update(buildings => {
    return [...buildings, {id: uuidv4(), coords, type, timeSinceLastHarvest: 0}];
  })
}
