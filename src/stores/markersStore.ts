import { get, writable } from 'svelte/store';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import type { Marker } from 'mapbox-gl';
import { mapStore } from './mapStore';

import type { Point, State } from '../util/types';

export const markersStore = writable<Marker[]>([]);

export const addMarker = ({ lng, lat }: Point) => {
  const map = get(mapStore);
  markersStore.update(oldMarkers => {
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
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
