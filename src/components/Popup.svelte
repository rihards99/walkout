<script lang="ts">
	import { BUILDINGS } from '../util/buildingConfig';
	import { harvestBuilding } from '../stores/buildingStore';
  import { BuildingType, type Building } from '../util/types';

  export let building: Building;

  let currentTime = (new Date).getTime() / 1000;
  const cooldown = BUILDINGS[building.type].cooldown;
  let canHarvest = currentTime - building.timeSinceLastHarvest >= cooldown;

  const onClick = () => {
    const didHarvest = harvestBuilding(building.id)
    canHarvest = !didHarvest; // If harvest was successful, set canHarvest to false
  };

  setInterval(() => {
    currentTime = (new Date).getTime() / 1000;
    const newCanHarvest = currentTime - building.timeSinceLastHarvest >= cooldown;
    if (canHarvest != newCanHarvest) {
      canHarvest = newCanHarvest
    }
  }, 1000)

</script>

<p class=popup>
  Lumberyard<br/>

  {#if canHarvest}
    <button on:click={onClick}>HARVEST</button>
  {:else}
    <p>Unavailable until: {new Date((building.timeSinceLastHarvest + cooldown) * 1000).toLocaleString()}</p>
  {/if}
</p>

<style>
.popup {
  margin: 20px;
}
</style>