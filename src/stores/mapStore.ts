import { writable } from 'svelte/store';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

export const mapStore = writable(null);

export const initMap = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmloYXJkczk5IiwiYSI6ImNsaDgxd3FpNDA0OXIzZHBud3NscW1mZmwifQ.Y0eOT5mYDmj8-eRD3_jG7A';
  const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    // center: [24.1056, 56.9677],
    // zoom: 1
  });

  const geolocateControls = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
  })

  map.addControl(geolocateControls);

  map.on('load', () => {
    geolocateControls.trigger();
  });

  mapStore.update(() => map)
}