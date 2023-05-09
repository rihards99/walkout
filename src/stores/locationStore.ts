import { writable } from 'svelte/store';

export const locationStore = writable({lng: 0, lat: 0});

export const initLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(position => {
        console.log("Location update", position.coords.latitude, position.coords.longitude);
        locationStore.update(() => ({ lng: position.coords.longitude, lat: position.coords.latitude }))
    });
  } else {
    alert("No GPS!")
    throw new Error("No GPS!");
  }
}