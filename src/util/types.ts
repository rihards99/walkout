export type Point = {
  lng: number,
  lat: number,
}

export type State = {
  buildings: Building[],
  hostileBuildings: HostileBuilding[],
  pickups: Pickup[],
  resources: Resources,
  skills: Skills,
  events: Events,
}

export type Resources = {
  [key in ResourceType]: number;
}

export enum ResourceType {
  Lumber = 'lumber',
  Gold = 'gold',
  Mana = 'mana',
  Planks = 'planks',
}

export enum BuildingType {
  LumberMill = 'lumberMill',
  GoldMine = 'goldMine',
  ManaWell = 'manaWell',
}

export enum HostileBuildingType {
  RaiderCamp = 'raiderCamp',
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
  hp: number;
}

export type HostileBuilding = MapObject & {
  type: HostileBuildingType;
}

export type Pickup = MapObject & {
  type: PickupType,
}

export enum EventType {
  RaiderCampSpawn = 'raiderCampSpawn',
  HostileBuildingsAttack = 'hostileBuildingsAttack',
}

export type Events = {
  [key in EventType]: number;
}