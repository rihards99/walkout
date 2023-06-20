import { get } from "svelte/store"
import { browser } from '$app/environment';

import type { State } from "../util/types"
import { mapStore } from "../stores/mapStore";
import { resourcesStore } from "../stores/resourcesStore";
import { buildingsStore } from "../stores/buildingStore";
import { pickupStore } from "../stores/pickupStore";
import { skillStore } from "../stores/skillStore";
import { hostileBuildingStore } from "../stores/hostileBuildingStore";
import { eventStore, initEventLoop } from "../stores/eventStore";
import { BUILDINGS } from "../configs/buildingConfig";


export const initLocalState = () => {
  // Load game
  mapStore.subscribe((map) => {
    if (map && browser) {
      const stateString = localStorage.getItem("gameState")
      if (stateString) {
        const state = JSON.parse(stateString) as State;
        console.log("Loading game", state);
        // TODO: Generalize
        if (state.buildings) {
          const buildings = state.buildings.map(building => {
            if (!building.hp) {
              building.hp = BUILDINGS[building.type].hp;
            }
            return building
          })
          buildingsStore.update(() => buildings)
        }
        if (state.resources) {
          resourcesStore.update((resources) => {
            return {...resources, ...state.resources} // Adds new resources to the resource store
          })
        }
        if (state.pickups) {
          pickupStore.update(() => state.pickups)
        }
        if (state.skills) {
          skillStore.update(() => state.skills)
        }
        if (state.hostileBuildings) {
          hostileBuildingStore.update(() => state.hostileBuildings)
        }
        if (state.events) {
          eventStore.update((events) => {
            return {...events, ...state.events} // Adds new resources to the resource store
          })
        }
      }
      initEventLoop();
    }
  })

  // After the mapStore updates the game is ready, which triggers
  // the loading of a game save. That triggers auto-saves here.
  const storesThatTriggerSave = [
    resourcesStore,
    buildingsStore,
    hostileBuildingStore,
    pickupStore,
    skillStore,
    eventStore,
  ];

  storesThatTriggerSave.forEach(store => {
    store.subscribe(() => {
      const map = get(mapStore);
      if (map) {
        saveGame();
      }
    });
  })
}

export const saveGame = () => {
  if (browser) {
    const buildings = get(buildingsStore)
    const hostileBuildings = get(hostileBuildingStore)
    const resources = get(resourcesStore)
    const pickups = get(pickupStore)
    const skills = get(skillStore)
    const events = get(eventStore)
    
    const state: State = {
      buildings,
      hostileBuildings,
      resources,
      pickups,
      skills,
      events,
    }

    console.log("GAME SAVE ", state);
  
    localStorage.setItem("gameState", JSON.stringify(state));
  }
}