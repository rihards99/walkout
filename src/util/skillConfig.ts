import { get } from 'svelte/store';
import { randomPosition, lengthToDegrees } from '@turf/turf';
import { setSkillCooldown } from "../stores/skillStore";
import { locationStore } from '../stores/locationStore';
import { PickupType, SkillType } from "./types";
import { randomElement } from './util';
import { createPickup } from '../stores/pickupStore';

type SkillConfig = {
  [key in SkillType]: {
    onUse: () => void,
    cooldown: number;
  }
};

const daysToSeconds = (days: number) => days * 24 * 60 * 60;

export const SKILLS: SkillConfig = {
  [SkillType.FindResources]: {
    onUse: () => {
      const findResourceDistance = 2;
      const findResourcesNumber = 15;

      console.log("Find Resources used");
      setSkillCooldown(SkillType.FindResources);
      const {lat, lng} = get(locationStore)
      const degrees = lengthToDegrees(findResourceDistance, "kilometers");

      for (let i = 0; i <= findResourcesNumber; i++) {
        const typeDistribution = [
          PickupType.Lumber,
          PickupType.Lumber,
          PickupType.Lumber,
          PickupType.Gold,
          PickupType.Gold,
          PickupType.Gold,
          PickupType.Mana,
        ]
        const randomPoint = randomPosition([lng - degrees, lat - degrees, lng + degrees, lat + degrees])
        const type = randomElement(typeDistribution);
        createPickup({lat: randomPoint[1]!, lng: randomPoint[0]!}, type);
      }
    },
    cooldown: daysToSeconds(1)
  },
}