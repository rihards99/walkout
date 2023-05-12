export type Point = {
  lng: number,
  lat: number,
}

export type State = {
  markers: Array<{
    lng: number,
    lat: number,
  }>
  resources: Resources,
}

export type Resources = {
  lumber: number;
  gold: number;
  mana: number;
}