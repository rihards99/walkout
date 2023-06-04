import { writable } from 'svelte/store';
import type { Skills, SkillType } from 'src/util/types';
import { getCurrentTimestamp } from '../util/util';

export const setSkillCooldown = (skillType: SkillType) => {
  skillStore.update((skills) => {
    skills[skillType].timeSinceLastUsed = getCurrentTimestamp();

    console.log("🚀 ~ JSON.parse(JSON.stringify(skills)):", JSON.parse(JSON.stringify(skills)));
    return JSON.parse(JSON.stringify(skills));
  })
}

export const skillStore = writable<Skills>({
  findResources: {
    timeSinceLastUsed: 0,
  }
});