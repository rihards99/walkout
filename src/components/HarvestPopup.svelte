<script lang="ts">
	import { BUILDINGS, harvestBuilding, repairBuilding } from '../configs/buildingConfig';
  import type { Building } from '../util/types';

  export let building: Building;

  let currentTime = (new Date).getTime() / 1000;
  const cooldown = BUILDINGS[building.type]!.cooldown;
  let canHarvest = currentTime - building.timeSinceLastHarvest >= cooldown;

  const onHarvestClick = () => {
    const didHarvest = harvestBuilding(building.id)
    canHarvest = !didHarvest; // If harvest was successful, set canHarvest to false
  };

  const onRepairClick = () => {
    repairBuilding(building.id)
  }

  setInterval(() => {
    currentTime = (new Date).getTime() / 1000;
    const newCanHarvest = currentTime - building.timeSinceLastHarvest >= cooldown;
    if (canHarvest != newCanHarvest) {
      canHarvest = newCanHarvest
    }
  }, 1000)

</script>

<p class=popup>
  {BUILDINGS[building.type].title}<br/>

  {#if canHarvest}
    <button on:click={onHarvestClick}>HARVEST</button>
  {:else}
    <p>Unavailable until: {new Date((building.timeSinceLastHarvest + cooldown) * 1000).toLocaleString()}</p>
  {/if}

  {#if building.hp < BUILDINGS[building.type].hp}
    <button on:click={onRepairClick}>REPAIR<br>(cost: 1 lumber)</button>
  {/if}
</p>

<style>
.popup {
  margin: 20px;
}
</style>