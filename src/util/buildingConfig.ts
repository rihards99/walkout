import { get } from "svelte/store";
import { addBuilding, buildingsStore } from "../stores/buildingStore";
import { BuildingType, ResourceType, type Point } from "./types"
import { addResource, resourcesStore, spendResource } from "../stores/resourcesStore";
import { distanceBetweenInKm, getCurrentTimestamp } from "./util";
import woodcutterIcon from '$lib/images/buildings/woodcutter.png';
import goldMineIcon from '$lib/images/buildings/goldmine.png';
import manaWellIcon from '$lib/images/buildings/manawell.png';

type BuildingConfig = {
  [key in BuildingType]: {
    title: string,
    icon: string,
    cost: {
      resource: ResourceType,
      amount: number,
    }[]
    cooldown: number,
    harvestResource?: ResourceType,
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
    addBuilding(coords, buildingType)
  }
}

export const harvestBuilding = (buildingId: string) => {
  console.log("HARVEST ", buildingId);
  const buildings = get(buildingsStore)
  const building = buildings.find(b => b.id === buildingId);

  if (building && BUILDINGS[building.type].harvestResource) {
    addResource(BUILDINGS[building.type].harvestResource!, 1);
    building.timeSinceLastHarvest = getCurrentTimestamp();
    buildingsStore.update(() => [...buildings]);
    return true;
  }

  return false;
}

export const BUILDINGS: BuildingConfig = {
  [BuildingType.LumberMill]: {
    title: 'Lumberyard',
    icon: woodcutterIcon,
    cost: [{
      resource: ResourceType.Lumber,
      amount: 5
    }],
    cooldown: 7200, // 2 hours
    harvestResource: ResourceType.Lumber,
  },
  [BuildingType.GoldMine]: {
    title: 'Gold Mine',
    icon: goldMineIcon,
    cost: [{
      resource: ResourceType.Gold,
      amount: 5
    }],
    cooldown: 7200, // 2 hours
    harvestResource: ResourceType.Gold,
  },
  [BuildingType.ManaWell]: {
    title: 'Mana Well',
    icon: manaWellIcon,
    cost: [{
      resource: ResourceType.Lumber,
      amount: 20
    }, {
      resource: ResourceType.Gold,
      amount: 20
    }],
    cooldown: 86400, // 24 hours
    harvestResource: ResourceType.Mana,
  }
}