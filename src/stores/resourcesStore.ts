import { writable } from 'svelte/store';
import type { Resources, ResourceType } from 'src/util/types';

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
    resources[resourceType] -= amount;
    console.log("🚀 ~ {...resources}:", {...resources});
    return {...resources};
  })
}

export const resourcesStore = writable<Resources>({
  lumber: 0,
  gold: 0,
  mana: 0,
});