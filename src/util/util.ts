import { distance, type Units } from '@turf/turf';
import { get } from 'svelte/store';
import { locationStore } from '../stores/locationStore';

import type { Point } from '../util/types';

export const RANGE = 0.1; // km

export const getCurrentTimestamp = () => Math.floor((new Date).getTime() / 1000);

export const distanceBetweenInKm = (point1: Point, point2: Point) => {
  const options = { units: "kilometers" as Units };
  return distance([point1.lng, point1.lat], [point2.lng, point2.lat], options);
}

export const isPointInRange = (point: Point) => {
  const currentLocation = get(locationStore)
  const distanceToPoint = distanceBetweenInKm(currentLocation, point);

  return distanceToPoint <= RANGE;
}

export const createGeoJSONCircle = (coords: Point, radiusInKm: number, points = 64) => {
  const km = radiusInKm;
  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.lat * Math.PI) / 180));
  const distanceY = km / 110.574;

  let theta, x, y;
  for (let i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.lng + x, coords.lat + y]);
  }
  ret.push(ret[0]);

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [ret]
    }
  };
};

export const randomElement = <T>(arr: T[]) => {
  return arr[Math.floor((Math.random() * arr.length))] as T;
}

// in miliseconds
const units: { [key: string]: number } = {
  year  : 24 * 60 * 60 * 1000 * 365,
  month : 24 * 60 * 60 * 1000 * 365 / 12,
  day   : 24 * 60 * 60 * 1000,
  hour  : 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

type RelativeTimeFormatUnit =
  | "year"
  | "years"
  | "quarter"
  | "quarters"
  | "month"
  | "months"
  | "week"
  | "weeks"
  | "day"
  | "days"
  | "hour"
  | "hours"
  | "minute"
  | "minutes"
  | "second"
  | "seconds";

export const getRelativeTime = (d1: Date, d2 = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const u in units)
    if (Math.abs(elapsed) > units[u]! || u == 'second') 
      return rtf.format(Math.round(elapsed/units[u]!), u as RelativeTimeFormatUnit)

  return "";
}