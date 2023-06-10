<script lang="ts">
  import { Marker } from '@beyonk/svelte-mapbox'

  import { pickupStore } from '../stores/pickupStore';
  import { PICKUPS } from '../configs/pickupConfig';
</script>

{#each $pickupStore as pickup}
  <Marker
    lat={pickup.coords.lat}
    lng={pickup.coords.lng}
    popup={false}
  >
    <img
      class="pickupIcon"
      src={PICKUPS[pickup.type].icon}
      alt={pickup.type}
      on:click={() => PICKUPS[pickup.type].onPickup(pickup.id)}
    />
  </Marker>
{/each}

<style>
  .pickupIcon {
    width: 32px;
    cursor: pointer;
  }
</style>
