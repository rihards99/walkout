import { get, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { type Point, ResourceType, type Building, BuildingType } from '../util/types';
import { addResource } from './resourcesStore';
import { getCurrentTimestamp } from '../util/util';



export const buildingsStore = writable<Building[]>([]);

export const harvestBuilding = (buildingId: string) => {
  console.log("HARVEST ", buildingId);
  const buildings = get(buildingsStore)
  const harvestedBuildingIndex = buildings.findIndex(b => b.id === buildingId);

  if (harvestedBuildingIndex != -1) {
    addResource(ResourceType.Lumber, 1);
    buildings[harvestedBuildingIndex]!.timeSinceLastHarvest = getCurrentTimestamp();
    buildingsStore.update(() => [...buildings]);
    return true;
  }

  return false;
}

export const addBuilding = (coords: Point, type: BuildingType) => {
  buildingsStore.update(buildings => {
    return [...buildings, {id: uuidv4(), coords, type, timeSinceLastHarvest: 0}];
  })
}
