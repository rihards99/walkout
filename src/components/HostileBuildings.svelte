<script lang="ts">
  import { get } from 'svelte/store';
  import { Map, Marker } from '@beyonk/svelte-mapbox'

  import { hostileBuildingStore } from '../stores/hostileBuildingStore';
  import { HOSTILE_BUILDINGS } from '../configs/hostileBuildingConfig';
	import CombatPopup from './CombatPopup.svelte';
	import { mapStore } from '../stores/mapStore';
  import { createGeoJSONCircle } from '../util/util';
  
  const HOSILE_BUILDING_RADIUS_NAME = "hostileBuildingCircles"
  const map = (get(mapStore) as unknown) as Map;

  if (map) {
    map.addSource(HOSILE_BUILDING_RADIUS_NAME, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          // createGeoJSONCircle(get(locationStore), RANGE)
        ]
      }
    });

    map.addLayer({
      id: HOSILE_BUILDING_RADIUS_NAME,
      type: 'fill',
      source: HOSILE_BUILDING_RADIUS_NAME,
      layout: {},
      paint: {
        'fill-opacity': 0.2,
        'fill-color': 'red'
      }
    });
  }

  $: {
    const hostileBuildingCircles = $hostileBuildingStore.map(building => {
      const range = HOSTILE_BUILDINGS[building.type].hostileRange
      return createGeoJSONCircle(building.coords, range)
    })

    map.getSource(HOSILE_BUILDING_RADIUS_NAME).setData({
      type: 'FeatureCollection',
      features: hostileBuildingCircles,
    });
  }
  

</script>

{#each $hostileBuildingStore as building}
  <Marker
    lat={building.coords.lat}
    lng={building.coords.lng}
  >
    <CombatPopup building={building} slot="popup"/>
    <img
      class="buildingIcon"
      src={HOSTILE_BUILDINGS[building.type].icon}
      alt={HOSTILE_BUILDINGS[building.type].title}
    />
  </Marker>
{/each}

<style>
  .buildingIcon {
    width: 48px;
    cursor: pointer;
  }
</style>
