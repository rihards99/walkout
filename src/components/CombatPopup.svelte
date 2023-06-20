<script lang="ts">
	import { HOSTILE_BUILDINGS, attackBuilding } from '../configs/hostileBuildingConfig';
  import type { HostileBuilding } from '../util/types';

  export let building: HostileBuilding;

  // let currentTime = (new Date).getTime() / 1000;
  // const cooldown = BUILDINGS[building.type]!.cooldown;
  // let canHarvest = currentTime - building.timeSinceLastHarvest >= cooldown;

  // const onClick = () => {
  //   const didHarvest = harvestBuilding(building.id)
  //   canHarvest = !didHarvest; // If harvest was successful, set canHarvest to false
  // };

  // setInterval(() => {
  //   currentTime = (new Date).getTime() / 1000;
  //   const newCanHarvest = currentTime - building.timeSinceLastHarvest >= cooldown;
  //   if (canHarvest != newCanHarvest) {
  //     canHarvest = newCanHarvest
  //   }
  // }, 1000)

</script>

<p class=popup>
  {HOSTILE_BUILDINGS[building.type].title}<br/>
  <button on:click={() => attackBuilding(building.id)}>ATTACK</button>
</p>

<style>
.popup {
  margin: 20px;
  color: red;
}
</style>