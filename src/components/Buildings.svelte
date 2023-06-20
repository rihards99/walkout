<script lang="ts">
  import { Marker } from '@beyonk/svelte-mapbox'

  import { buildingsStore } from '../stores/buildingStore';
  import { BUILDINGS } from '../configs/buildingConfig';
	import HarvestPopup from './HarvestPopup.svelte';

  
</script>

{#each $buildingsStore as building}
  <Marker
    lat={building.coords.lat}
    lng={building.coords.lng}
  >
    <HarvestPopup building={building} slot="popup"/>
    <img
      class="buildingIcon"
      src={BUILDINGS[building.type].icon}
      alt={BUILDINGS[building.type].title}
    />
    <div class="hp">{building.hp} / {BUILDINGS[building.type].hp}</div>
  </Marker>
{/each}

<style>
  .buildingIcon {
    width: 48px;
    cursor: pointer;
  }

  .hp {
    background: white;
    border-radius: 5px;
    border: solid 1px black;
  }
</style>
