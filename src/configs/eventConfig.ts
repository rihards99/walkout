import { get } from "svelte/store";
import { randomPosition, lengthToDegrees } from '@turf/turf';
import { buildingsStore, damageBuilding } from "../stores/buildingStore";
import { EventType, HostileBuildingType, type Point } from "../util/types";
import { HOSTILE_BUILDINGS } from "./hostileBuildingConfig";
import { addHostileBuilding, hostileBuildingStore } from "../stores/hostileBuildingStore";
import { distanceBetweenInKm } from "../util/util";


type EventConfig = {
  [key in EventType]: {
    cooldown: number,
    effect: () => void,
  }
}

const spawnRaiderCampRandomlyAroundPoint = ({lat, lng}: Point) => {
  const range = HOSTILE_BUILDINGS[HostileBuildingType.RaiderCamp].hostileRange
  const degrees = lengthToDegrees(range, "kilometers");
  const randomPoint = randomPosition([lng - degrees, lat - degrees, lng + degrees, lat + degrees])
  addHostileBuilding({lat: randomPoint[1]!, lng: randomPoint[0]!}, HostileBuildingType.RaiderCamp);
}


export const EVENTS: EventConfig = {
  [EventType.RaiderCampSpawn]: {
    cooldown: 60 * 60 * 12,
    effect: () => {
      const SPAWN_RATE = HOSTILE_BUILDINGS[HostileBuildingType.RaiderCamp].spawnChance;

      console.log("Event: RANDER CAMP SPAWN");
      const buildings = get(buildingsStore);
      buildings.some(building => {
        if (Math.random() < SPAWN_RATE) {
          spawnRaiderCampRandomlyAroundPoint(building.coords);
          return true;
        }

        return false;
      })
    }
  },
  [EventType.HostileBuildingsAttack]: {
    cooldown: 60 * 60 * 6,
    effect: () => {
      console.log("Event: HOSTILE BUILDINGS ATTACK")
      const hostileBuldings = get(hostileBuildingStore);
      const buildings = get(buildingsStore);
      hostileBuldings.forEach(hostileBuilding => {
        const hostileBuildingRange = HOSTILE_BUILDINGS[hostileBuilding.type].hostileRange;
        buildings.forEach(building => {
          if (distanceBetweenInKm(hostileBuilding.coords, building.coords) <= hostileBuildingRange) {
            damageBuilding(building.id);
          }
        })
      })
    }
  },
};
