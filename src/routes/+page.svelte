<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { Map, controls } from '@beyonk/svelte-mapbox';

	import { mapStore } from '../stores/mapStore';
	import { locationStore, initLocation } from '../stores/locationStore';
	import Ui from '../components/Ui.svelte';
	import Buildings from '../components/Buildings.svelte';
	import Pickups from '../components/Pickups.svelte';
	import { addResource, resourcesStore } from '../stores/resourcesStore';
	import { createPickup } from '../stores/pickupStore';

	import { BuildingType, PickupType, ResourceType, SkillType } from '../util/types';
	import { initLocalState } from '../util/localState';
	import { createGeoJSONCircle, RANGE } from '../util/util';
	import SkillButton from '../components/SkillButton.svelte';
	import { BUILDINGS, build, hasEnoughResourcesToBuild } from '../util/buildingConfig';

	const { GeolocateControl } = controls;

	let mapComponent: Map;
	let controlComponent: typeof GeolocateControl;

	const clearSave = () => {
		localStorage.removeItem('gameState');
		location.reload();
	};

	onMount(async () => {
		initLocation();
		initLocalState();
	});

	const geoControlOptions = {
		positionOptions: {
			enableHighAccuracy: true
		},
		trackUserLocation: true,
		showUserHeading: true
	};

	const onMapReady = () => {
		console.log('Map ready', mapComponent.getMap());
		setTimeout(() => controlComponent.trigger(), 500); // TODO: Figure out how to do the trigger right on load without waiting
		mapStore.update(() => mapComponent.getMap());

		const map = mapComponent.getMap();
		map.addSource('polygon', createGeoJSONCircle(get(locationStore), RANGE));
		map.addLayer({
			id: 'polygon',
			type: 'line',
			source: 'polygon',
			layout: {},
			paint: {
				'line-width': 1,
				'line-color': 'grey'
			}
		});
		locationStore.subscribe(location => {
			map.getSource('polygon').setData(createGeoJSONCircle(location, RANGE).data);
		})
	};

	const onDropdownClick = (dropdownClass: string) => {
		const el = document.querySelector(dropdownClass)
		if (el?.classList.contains("show")) {
			el?.classList.remove("show");
		} else {
			document.querySelectorAll(".show")?.forEach(e => e.classList.remove("show"));
			el?.classList.add("show");
		}
	}


	// TODO: Generalize
	let canBuildLumberyard = true;
	let canBuildGoldMine = true;
	let canBuildManaWell = true;
	resourcesStore.subscribe(() => {
		canBuildLumberyard = hasEnoughResourcesToBuild(BuildingType.LumberMill);
		canBuildGoldMine = hasEnoughResourcesToBuild(BuildingType.GoldMine)
		canBuildManaWell = hasEnoughResourcesToBuild(BuildingType.ManaWell)
	})
</script>

<main>
	<Map
		bind:this={mapComponent}
		accessToken="pk.eyJ1IjoicmloYXJkczk5IiwiYSI6ImNsaDgxd3FpNDA0OXIzZHBud3NscW1mZmwifQ.Y0eOT5mYDmj8-eRD3_jG7A"
		version="v2.14.1"
		style="mapbox://styles/rihards99/clilwmjs2004x01o3bg5ahzuc"
		zoom="1"
		on:ready={onMapReady}
	>
		<GeolocateControl options={geoControlOptions} bind:this={controlComponent} />

		<Buildings />
		<Pickups />
	</Map>

	<Ui>
		<button on:click={() => onDropdownClick(".buildOptions")}>BUILD</button>
		<div class="buildOptions dropdown">
			<button disabled={!canBuildLumberyard} on:click={() => build($locationStore, BuildingType.LumberMill)}>
				Build Lumberyard<br>
				({BUILDINGS.lumberMill.cost.reduce((acc, cost) => acc + `${cost.resource}: ${cost.amount}`, "")})
			</button>
			<button disabled={!canBuildGoldMine} on:click={() => build($locationStore, BuildingType.GoldMine)}>
				Build Gold Mine<br>
				({BUILDINGS.goldMine.cost.reduce((acc, cost) => acc + `${cost.resource}: ${cost.amount}`, "")})
			</button>
			<button disabled={!canBuildManaWell} on:click={() => build($locationStore, BuildingType.ManaWell)}>
				Build Mana Well<br>
				({BUILDINGS.manaWell.cost.reduce((acc, cost) => acc + `${cost.resource}: ${cost.amount}, `, "")})
			</button>
		</div>

		<button on:click={() => onDropdownClick(".skillOptions")}>USE SKILL</button>
		<div class="skillOptions dropdown">
			<SkillButton skillType={SkillType.FindResources}/>
		</div>

		<button class="cheatsButton" on:click={() => onDropdownClick(".cheatsOptions")}>CHEATS</button>
		<div class="cheatsOptions dropdown">
			<button on:click={() => addResource(ResourceType.Lumber, 1)}>Earn lumber</button>
			<button on:click={() => addResource(ResourceType.Gold, 1)}>Earn gold</button>
			<button on:click={() => addResource(ResourceType.Mana, 1)}>Earn mana</button>
			<button
				on:click={() =>
					createPickup(
						{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
						PickupType.Lumber
					)}>Spawn lumber pickup</button
			>
			<button
				on:click={() =>
					createPickup(
						{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
						PickupType.Gold
					)}>Spawn gold pickup</button
			>
			<button
				on:click={() =>
					createPickup(
						{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
						PickupType.Mana
					)}>Spawn mana pickup</button
			>
			<button on:click={clearSave}>Clear Save</button>
		</div>
		<div class="resourceBar">
			🟢 Lumber: {$resourcesStore.lumber} | 🟡 Gold: {$resourcesStore.gold} | 🟣 Mana: {$resourcesStore.mana}
		</div>
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

	:global(.mapboxgl-map) {
		min-height: 90vh;
	}

	.resourceBar {
		background: white;
		position: absolute;
		bottom: 30px;
		border-radius: 10px;
	}

	.dropdown {
		display: none;
		position: absolute;
    flex-direction: column;
		gap: 10px;
	}

	:global(.show) {
		display: flex!important;
	}

	.cheatsButton {
		background-color: #ff4e4e;
	}

	:global(.mapboxgl-user-location-accuracy-circle), :global(.mapboxgl-user-location) {
		pointer-events: none!important;
	}
</style>
