import { get, writable } from 'svelte/store';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import type { Marker } from 'mapbox-gl';

import { mapStore } from './mapStore';
import Popup from '../components/Popup.svelte';
import type { Point } from '../util/types';

export const markersStore = writable<Marker[]>([]);

export const addMarker = ({ lng, lat }: Point) => {
  const map = get(mapStore);
  markersStore.update(oldMarkers => {
    const popupComponent = new Popup({target: document.querySelector('.hiddenPlaceholder')!});
    const onClick = () => console.log("CLICK");
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<button onclick="${onClick}">HARVEST</button>`)
    //.setDOMContent(popupComponent.);

    const marker: Marker = new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(map);

    return [...oldMarkers, marker]
  })
}

export const addMarkers = (points: Point[]) => {
  const map = get(mapStore);
  markersStore.update(oldMarkers => {
    const markers = points.map(point => new mapboxgl.Marker().setLngLat([point.lng, point.lat]).addTo(map))
    return [...oldMarkers, ...markers]
  })
}
