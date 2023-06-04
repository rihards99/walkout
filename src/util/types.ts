export type Point = {
  lng: number,
  lat: number,
}

export type State = {
  buildings: Building[],
  pickups: Pickup[],
  resources: Resources,
  skills: Skills,
}

export interface Resources {
  lumber: number;
  gold: number;
  mana: number;
}

export enum ResourceType {
  Lumber = 'lumber',
  Gold = 'gold',
  Mana = 'mana'
}

export enum BuildingType {
  LumberMill = 'lumberMill',
  GoldMine = 'goldMine',
  ManaWell = 'manaWell',
}

export enum PickupType {
  Lumber = 'lumber',
  Gold = 'gold',
  Mana = 'mana'
}

export type Skills = {
  [key in SkillType]: {
    timeSinceLastUsed: number;
  }
}

export enum SkillType {
  FindResources = 'findResources',
}

export interface MapObject {
  id: string,
  coords: Point,
}

export type Building = MapObject & {
  type: BuildingType,
  timeSinceLastHarvest: number;
}

export type Pickup = MapObject & {
  type: PickupType,
}