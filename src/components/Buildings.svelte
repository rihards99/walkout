<script lang="ts">
  import { Marker } from '@beyonk/svelte-mapbox'

  import { buildingsStore } from '../stores/buildingStore';
  import { BUILDINGS } from '../util/buildingConfig';
	import Popup from './Popup.svelte';

  
</script>

{#each $buildingsStore as building}
  <Marker
    lat={building.coords.lat}
    lng={building.coords.lng}
    color={BUILDINGS[building.type].color}
    label="some marker label"
    popupClassName="class-name"
  >
    <Popup building={building} slot="popup"/>
  </Marker>
{/each}