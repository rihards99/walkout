import { get } from "svelte/store"
import { browser } from '$app/environment';

import type { State } from "../util/types"
import { mapStore } from "../stores/mapStore";
import { resourcesStore } from "../stores/resourcesStore";
import { buildingsStore } from "../stores/buildingStore";
import { pickupStore } from "../stores/pickupStore";
import { skillStore } from "../stores/skillStore";


export const initLocalState = () => {
  // Load game
  mapStore.subscribe((map) => {
    console.log("Updating map")
    if (map && browser) {
      const stateString = localStorage.getItem("gameState")
      if (stateString) {
        const state = JSON.parse(stateString) as State;
        console.log("Loading", state);
        // TODO: Generalize
        if (state.buildings) {
          buildingsStore.update(() => state.buildings)
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
      }
    }
  })

  // After the mapStore updates the game is ready, which triggers
  // the loading of a game save. That triggers auto-saves here.
  const storesToSave = [
    resourcesStore,
    buildingsStore,
    pickupStore,
    skillStore,
  ];

  storesToSave.forEach(store => {
    store.subscribe(() => {
      const map = get(mapStore);
      if (map) {
        saveGame();
      }
    });
  })
}

export const saveGame = () => {
  console.log("saveGame")
  if (browser) {
    const buildings = get(buildingsStore)
    const resources = get(resourcesStore)
    const pickups = get(pickupStore)
    const skills = get(skillStore)
    
    const state: State = {
      buildings,
      resources,
      pickups,
      skills,
    }

    console.log("GAME SAVE ", state);
  
    localStorage.setItem("gameState", JSON.stringify(state));
  }
}