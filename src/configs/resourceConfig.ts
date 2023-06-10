import { ResourceType } from "../util/types";

import logImage from '$lib/images/pickups/log3.svg';
import goldImage from '$lib/images/pickups/gold4.svg';
import manaImage from '$lib/images/pickups/mana3.svg';
import plankImage from '$lib/images/pickups/plank.svg';

type ResourceConfig = {
  [key in ResourceType]: {
    name: string,
    icon: string,
  }
};

export const RESOURCES: ResourceConfig = {
  [ResourceType.Lumber]: {
    name: "Lumber",
    icon: logImage,
  },

  [ResourceType.Gold]: {
    name: "Gold",
    icon: goldImage,
  },

  [ResourceType.Mana]: {
    name: "Mana",
    icon: manaImage,
  },

  [ResourceType.Planks]: {
    name: "Planks",
    icon: plankImage,
  },
}