import { get } from "svelte/store"
import { browser } from '$app/environment';

import { addMarkers, markersStore } from "../stores/markersStore"
import type { State } from "./types"
import { mapStore } from "../stores/mapStore";
import { resourcesStore } from "../stores/resourcesStore";

// Load game
mapStore.subscribe((map) => {
  if (map && browser) {
    const stateString = localStorage.getItem("gameState")
    if (stateString) {
      const state = JSON.parse(stateString) as State;
      addMarkers(state.markers);
      if (state.resources) {
        resourcesStore.update(() => state.resources)
      }
    }
  }
})

// After the mapStore updates the game is ready, which triggers
// the loading of a game save. That triggers auto-saves here.
markersStore.subscribe(() => {
  const map = get(mapStore);
  if (map) {
    saveGame();
  }
});

resourcesStore.subscribe(() => {
  const map = get(mapStore);
  if (map) {
    saveGame();
  }
});

export const saveGame = () => {
  if (browser) {
    const markers = get(markersStore)
    const resources = get(resourcesStore)
    
    const state: State = {
      markers: markers.map(marker => marker.getLngLat()),
      resources,
    }

    console.log("GAME SAVE ", state);
  
    localStorage.setItem("gameState", JSON.stringify(state));
  }
}