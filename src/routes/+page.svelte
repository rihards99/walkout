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
	import SkillButton from '../components/SkillButton.svelte';
	import Inventory from '../components/Inventory.svelte';
	import HostileBuildings from '../components/HostileBuildings.svelte';
	import { addResource, resourcesStore } from '../stores/resourcesStore';
	import { createPickup } from '../stores/pickupStore';
	import { addHostileBuilding } from '../stores/hostileBuildingStore';
	import { initLocalState } from '../util/localState';
	import { BuildingType, HostileBuildingType, PickupType, ResourceType, SkillType } from '../util/types';
	import { createGeoJSONCircle, RANGE } from '../util/util';
	import { BUILDINGS, build, hasEnoughResourcesToBuild } from '../configs/buildingConfig';

	const { GeolocateControl } = controls;
	const PLAYER_RANGE_GEOJSON_NAME = 'playerRange';

	let mapComponent: Map;
	let controlComponent: typeof GeolocateControl;
	let showInventory = false;

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

		map.addSource(PLAYER_RANGE_GEOJSON_NAME, {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					createGeoJSONCircle(get(locationStore), RANGE)
				]
			}
		});

		map.addLayer({
			id: PLAYER_RANGE_GEOJSON_NAME,
			type: 'line',
			source: PLAYER_RANGE_GEOJSON_NAME,
			layout: {},
			paint: {
				'line-width': 1,
				'line-color': 'grey'
			}
		});

		locationStore.subscribe(location => {

			map.getSource(PLAYER_RANGE_GEOJSON_NAME).setData({
				type: 'FeatureCollection',
				features: [
					createGeoJSONCircle(location, RANGE)
				]
			});
		})
	};

	const onDropdownClick = (dropdownClass: string, showClass: string = "show") => {

		const el = document.querySelector(dropdownClass)
		if (el?.classList.contains(showClass)) {
			el?.classList.remove(showClass);
		} else {
			document.querySelectorAll(`.${showClass}`)?.forEach(e => e.classList.remove(showClass));
			el?.classList.add(showClass);
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
		<HostileBuildings />
		<Pickups />
	</Map>

	<Ui>
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

		<div class="skillOptions dropdown">
			<SkillButton skillType={SkillType.FindResources}/>
		</div>

		<div class="cheatsOptions dropdown">
			<button on:click={() => addResource(ResourceType.Lumber, 1)}>Earn lumber</button>
			<button on:click={() => addResource(ResourceType.Gold, 1)}>Earn gold</button>
			<button on:click={() => addResource(ResourceType.Mana, 1)}>Earn mana</button>
			<button
				on:click={() =>
					createPickup(
						{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
						PickupType.Lumber
					)}
			>
				Spawn lumber pickup
			</button>
			<button
				on:click={() =>
					createPickup(
						{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
						PickupType.Gold
					)}
			>
				Spawn gold pickup
			</button>
			<button
				on:click={() =>
					createPickup(
						{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
						PickupType.Mana
					)}
			>
				Spawn mana pickup
			</button>
			<button on:click={() => addHostileBuilding(
					{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
					HostileBuildingType.RaiderCamp
				)}
			>Spawn raider camp</button>
			<button on:click={clearSave}>Clear Save</button>
		</div>

		<div class="bottomButtons">
			<button on:click={() => showInventory = !showInventory}>
				<span class="bottomButtonLabel">Inventory</span>📦
			</button>
			<button on:click={() => onDropdownClick(".buildOptions")}>
				<span class="bottomButtonLabel">Build</span>⚒️
			</button>
			<button on:click={() => onDropdownClick(".skillOptions")}>
				<span class="bottomButtonLabel">Skills</span>📜
			</button>
			<button on:click={() => onDropdownClick(".cheatsOptions")} style="background-color: rgb(237 139 139);">
				<span class="bottomButtonLabel">Cheats</span>🔒
			</button>
		</div>

		{#if showInventory}
			<Inventory onClose={() => showInventory = false}/>	
		{/if}
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

	.bottomButtons {
		position: absolute;
		bottom: 30px;
		right: 0px;
	}

	.bottomButtonLabel {
		position: absolute;
    font-size: 15px;
    bottom: -22px;
    left: -3px;
    text-align: center;
    width: 70px;
    padding: 0;
	}

	.bottomButtons > * {
		position: relative;
		font-size: 32px;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background-color: #dbd6d6;
    border: solid 3px black;
	}

	.dropdown {
		display: none;
		position: absolute;
		bottom: 110px;
		right: 0px;
    flex-direction: column;
		gap: 10px;
		z-index: 3;
	}

	:global(.show) {
		display: flex!important;
	}

	:global(.showInventory) {
		display: inherit!important;
	}

	:global(.mapboxgl-user-location-accuracy-circle), :global(.mapboxgl-user-location) {
		pointer-events: none!important;
	}
</style>
