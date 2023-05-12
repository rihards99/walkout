<script lang="ts">
	import { onMount } from 'svelte'
	import 'mapbox-gl/dist/mapbox-gl.css';

	import { initMap } from '../stores/mapStore';
	import { addMarker } from '../stores/markersStore';
	import { locationStore, initLocation } from '../stores/locationStore';
	import Ui from '../components/Ui.svelte'
	import { saveGame } from '../util/localState';
	import { addResource, resourcesStore } from '../stores/resourcesStore';

	const buildMine = () => {
		addMarker($locationStore);
	}

	const clearSave = () => {
		localStorage.removeItem("gameState");
	}

	onMount(async () => {
		initLocation();
		initMap();
	})
</script>

<main>
	<div id="map"></div>

	<Ui>
		<button on:click={buildMine}>Build Mine</button>
		<button on:click={saveGame}>Save Game</button>
		<button on:click={clearSave}>Clear Save</button>
		<button on:click={() => addResource("lumber", 1)}>Earn lumber</button>
		<div class="resourceBar">🟢 Lumber: {$resourcesStore.lumber} | 🟡 Gold: {$resourcesStore.gold} | 🔵 Mana: {$resourcesStore.mana}</div>
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

	.resourceBar {
		background: white;
    position: absolute;
    bottom: 30px;
    border-radius: 10px;
	}
</style>