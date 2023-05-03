<script>
	import { onMount } from 'svelte'
	import Test from './Test.svelte';
	import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
	import 'mapbox-gl/dist/mapbox-gl.css';
	

  let name = "Me";
	let map;

	onMount(async () => {
		console.log("asdasdad");
		console.log("🚀 ~ mapboxgl:", mapboxgl);
		mapboxgl.accessToken = 'pk.eyJ1IjoicmloYXJkczk5IiwiYSI6ImNsaDgxd3FpNDA0OXIzZHBud3NscW1mZmwifQ.Y0eOT5mYDmj8-eRD3_jG7A';
		map = new mapboxgl.Map({
			container: 'map',
			// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [-77.04, 38.907],
			zoom: 11.15
		});	
	})

	const changeName = () => {
		if (name === "world") {
      name = "Svelte";
    } else {
      name = "world";
    }
	}
</script>

<!-- <svelte:head>
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head> -->

<main>
  <h1>Hello {name}!</h1>
	<button on:click={changeName}>CLICK ME</button>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
	<Test testProp={name}/>

	<div id="map"></div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

	#map {
		height: 75vh
	}
</style>