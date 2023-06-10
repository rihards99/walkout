<script lang="ts">
  import { Marker } from '@beyonk/svelte-mapbox'

  import { buildingsStore } from '../stores/buildingStore';
  import { BUILDINGS } from '../configs/buildingConfig';
	import Popup from './Popup.svelte';

  
</script>

{#each $buildingsStore as building}
  <Marker
    lat={building.coords.lat}
    lng={building.coords.lng}
  >
    <Popup building={building} slot="popup"/>
    <img
      class="buildingIcon"
      src={BUILDINGS[building.type].icon}
      alt={BUILDINGS[building.type].title}
    />
  </Marker>
{/each}

<style>
  .buildingIcon {
    width: 48px;
    cursor: pointer;
  }
</style>
