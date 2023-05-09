<script lang="ts">
	import { onMount } from 'svelte'
	import 'mapbox-gl/dist/mapbox-gl.css';

	import { mapStore, initMap } from '../stores/mapStore';
	import { addMarker } from '../stores/markersStore';
	import { locationStore, initLocation } from '../stores/locationStore';
	import Ui from '../components/Ui.svelte'
	import { saveGame } from '../util/localState';

	const buildMine = () => {
		addMarker($locationStore);
	}

	onMount(async () => {
		initLocation();
		initMap();
	})
</script>

<main>
	<div id="map"></div>

	<Ui>
		<button on:click={buildMine}>Build mine</button>
		<button on:click={saveGame}>Save game</button>
	</Ui>
</main>

<style>
	:global(body) {
		margin: 0;
	}

	main {
    text-align: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

	#map {
		min-height: 90vh;
		/* min-height: -webkit-fill-available; */
	}
</style>