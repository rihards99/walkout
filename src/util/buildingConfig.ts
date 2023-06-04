import { get } from "svelte/store";
import { addBuilding, buildingsStore } from "../stores/buildingStore";
import { BuildingType, ResourceType, type Point } from "./types"
import { resourcesStore, spendResource } from "../stores/resourcesStore";
import { distanceBetweenInKm } from "./util";

type BuildingConfig = {
  [key in BuildingType]: {
    color: string,
    cost: {
      resource: ResourceType,
      amount: number,
    }[]
    cooldown: number,
  }
};

const DISTANCE_BETWEEN_BUILDINGS = 0.1

export const hasEnoughResourcesToBuild = (buildingType: BuildingType) => {
  const resources = get(resourcesStore);
  return BUILDINGS[buildingType].cost.every(cost => resources[cost.resource] - cost.amount >= 0)
}

const isBuildingFarEnoughFromOthers = (coords: Point) => {
  const buildings = get(buildingsStore);
  return buildings.every(building => distanceBetweenInKm(building.coords, coords) > DISTANCE_BETWEEN_BUILDINGS)
}

export const build = (coords: Point, buildingType: BuildingType) => {
  if (!isBuildingFarEnoughFromOthers(coords)) {
    alert("Building too close to other buildings. Shouldn't be able to reach two buildings at the same time.");
    return;
  }

  if (hasEnoughResourcesToBuild(buildingType)) {
    BUILDINGS[buildingType].cost.forEach(cost => spendResource(cost.resource, cost.amount))
    addBuilding(coords, BuildingType.LumberMill)
  }
}

export const BUILDINGS: BuildingConfig = {
  [BuildingType.LumberMill]: {
    color: 'rgb(150,205,150)',
    cost: [{
      resource: ResourceType.Lumber,
      amount: 5
    }],
    cooldown: 300
  },
  [BuildingType.GoldMine]: {
    color: 'rgb(100,255,255)',
    cost: [{
      resource: ResourceType.Gold,
      amount: 5
    }],
    cooldown: 300
  },
  [BuildingType.ManaWell]: {
    color: 'rgb(100,100,255)',
    cost: [{
      resource: ResourceType.Lumber,
      amount: 20
    }, {
      resource: ResourceType.Gold,
      amount: 20
    }],
    cooldown: 3000
  }
}