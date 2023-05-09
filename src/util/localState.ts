import { addMarkers, markersStore } from "../stores/markersStore"
import { get } from "svelte/store"

import type { State } from "./types"
import { mapStore } from "../stores/mapStore";

// Load game
mapStore.subscribe((map) => {
  if (!!map) {
    const stateString = localStorage.getItem("gameState")
    if (stateString) {
      const state = JSON.parse(stateString) as State;
      addMarkers(state.markers);
    }
  }
})

export const saveGame = () => {
  const markers = get(markersStore)
  
  const state: State = {
    markers: markers.map(marker => marker.getLngLat())
  }

  localStorage.setItem("gameState", JSON.stringify(state));
}