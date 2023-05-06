<script>
	import { onMount } from 'svelte'
	import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
	import 'mapbox-gl/dist/mapbox-gl.css';
	
	let map;

	onMount(async () => {
		console.log("asdasdad");
		console.log("🚀 ~ mapboxgl:", mapboxgl);
		mapboxgl.accessToken = 'pk.eyJ1IjoicmloYXJkczk5IiwiYSI6ImNsaDgxd3FpNDA0OXIzZHBud3NscW1mZmwifQ.Y0eOT5mYDmj8-eRD3_jG7A';
		map = new mapboxgl.Map({
			container: 'map',
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [24.1056, 56.9677],
			zoom: 16
		});

		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				// When active the map will receive updates to the device's location as it changes.
				trackUserLocation: true,
				// Draw an arrow next to the location dot to indicate which direction the device is heading.
				showUserHeading: true
			})
		);
	})
</script>

<main>
	<div id="map"></div>
</main>

<style>
	:global(body) {
		margin: 0;
	}

	main {
    text-align: center;
    max-width: 240px;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

	#map {
		height: 100vh
	}
</style>