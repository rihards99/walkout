import { get } from "svelte/store";
import type { ComponentType } from "svelte";
import { type Point, HostileBuildingType } from "../util/types"
import raiderCampIcon from '$lib/images/hostileBuildings/war_camp.png';
import CombatPopup from "../components/CombatPopup.svelte";
import { isPointInRange } from "../util/util";
import { destroyHostileBuidling, hostileBuildingStore } from "../stores/hostileBuildingStore";

type HostileBuildingConfig = {
  [key in HostileBuildingType]: {
    title: string,
    icon: string,
    popup: ComponentType,
    hostileRange: number,
    spawnChance: number,
  }
};

export const attackBuilding = (id: string) => {
  const hostileBuildings = get(hostileBuildingStore);
  const buildingBeingAttacked = hostileBuildings.find(hostileBuilding => hostileBuilding.id === id)
  if (buildingBeingAttacked && isPointInRange(buildingBeingAttacked.coords)) {
    destroyHostileBuidling(id);
  } else {
    alert("Hostile building not in range!");
  }
}

export const HOSTILE_BUILDINGS: HostileBuildingConfig = {
  [HostileBuildingType.RaiderCamp]: {
    title: "Raider Camp",
    icon: raiderCampIcon,
    popup: CombatPopup,
    hostileRange: 0.2,
    spawnChance: 0.2,
  }
}