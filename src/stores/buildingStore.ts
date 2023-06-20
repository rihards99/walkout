import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { Point, Building, BuildingType } from '../util/types';
import { BUILDINGS } from '../configs/buildingConfig';

export const buildingsStore = writable<Building[]>([]);

export const addBuilding = (coords: Point, type: BuildingType) => {
  buildingsStore.update(buildings => {
    return [
      ...buildings,
      {
        id: uuidv4(),
        coords,
        type,
        timeSinceLastHarvest: 0,
        hp: BUILDINGS[type].hp,
      }
    ];
  })
}

export const damageBuilding = (id: string) => {
  buildingsStore.update(buildings => {
    return buildings
      .map(building => {
        if (building.id === id) {
          building.hp -= 1;
        }
        return building;
      })
      .filter(building => building.hp > 0)
  })
}
