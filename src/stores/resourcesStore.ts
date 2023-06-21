import { writable } from 'svelte/store';
import { ResourceType, type Resources } from '../util/types';
import { RESOURCES } from '../configs/resourceConfig';

export const addResource = (resourceType: ResourceType, amount: number) => {
  resourcesStore.update((resources) => {
    console.log("🚀 ~ resources:", resources);
    resources[resourceType] += amount;
    console.log("🚀 ~ {...resources}:", {...resources});
    return {...resources};
  })
}

export const spendResource = (resourceType: ResourceType, amount: number) => {
  resourcesStore.update((resources) => {
    console.log("🚀 ~ resources:", resources);

    if (resources[resourceType] - amount >= 0 ) {
      resources[resourceType] -= amount;
    } else {
      throw new Error("Missing resource")
    }

    console.log("🚀 ~ {...resources}:", {...resources});
    return {...resources};
  })
}

const defaultResourceObject = Object.keys(RESOURCES).reduce<Resources>((acc, key) => {
  acc[key as ResourceType] = 0;
  return acc;
}, {} as Resources)

export const resourcesStore = writable<Resources>(defaultResourceObject);