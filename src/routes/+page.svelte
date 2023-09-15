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
	import { RESOURCES } from '../configs/resourceConfig';
	import ResourceIcon from '../components/UI/ResourceIcon.svelte';
	

	import chestIcon from '$lib/images/ui/chest.svg';
	import hammerIcon from '$lib/images/ui/thor-hammer.svg';
	import bookIcon from '$lib/images/ui/spell-book.svg';
	import chainsIcon from '$lib/images/ui/crossed-chains.svg';

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

		// Disable browser pinch zoom
		window.addEventListener('wheel', function(e) {
			e.preventDefault()
		}, {passive: false})
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

	const onCreatePickupClick = (pickupType: PickupType) => createPickup(
		{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
		pickupType
	);

	// Object.keys always returns string[], so you need to assert it as something
  // before using it.
	let buildingTypes: BuildingType[];
  $: {
		$resourcesStore;
    buildingTypes = Object.keys(BUILDINGS) as BuildingType[];
  }

</script>

<svelte:head>
	<title>Walkout</title>
	<meta name="Walkout" content="GPS game" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
</svelte:head>

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
		<a href="/kikai" class="btn">KIKAI</a>

		<div class="buildOptions dropdown">
			{#each buildingTypes as buildingType}
				<button
					class="btn"
					disabled={!hasEnoughResourcesToBuild(buildingType)}
					on:click={() => build($locationStore, buildingType)}
				>
					{BUILDINGS[buildingType].title}
					<span class="buildButtonResources">
						{#each BUILDINGS[buildingType].cost as cost}
							<span class="buildButtonResource">
								{cost.amount}
								<ResourceIcon icon={RESOURCES[cost.resource].icon} />
							</span>
						{/each}
					</span>
				</button>
			{/each}
		</div>

		<div class="skillOptions dropdown">
			<SkillButton skillType={SkillType.FindResources}/>
		</div>

		<div class="cheatsOptions dropdown">
			<button class="btn" on:click={() => addResource(ResourceType.Lumber, 1)}>Earn lumber</button>
			<button class="btn" on:click={() => addResource(ResourceType.Gold, 1)}>Earn gold</button>
			<button class="btn" on:click={() => addResource(ResourceType.Mana, 1)}>Earn mana</button>
			<button class="btn" on:click={() => onCreatePickupClick(PickupType.Lumber)}>Spawn lumber pickup</button>
			<button
				class="btn"
				on:click={() => addHostileBuilding(
					{ lat: get(locationStore).lat + 0.0001, lng: get(locationStore).lng + 0.001 },
					HostileBuildingType.RaiderCamp
				)}
			>
				Spawn raider camp
			</button>
			<button class="btn" on:click={clearSave}>Clear Save</button>
		</div>

		<div class="bottomButtons">
			<button class="bottomButton" on:click={() => showInventory = !showInventory}>
				<img class="bottomButtonIcon" src={chestIcon} alt="inventory"/>
				<span class="bottomButtonLabel">Inventory</span>
			</button>
			<button class="bottomButton" on:click={() => onDropdownClick(".buildOptions")}>
				<img class="bottomButtonIcon" src={hammerIcon} alt="build"/>
				<span class="bottomButtonLabel">Build</span>
			</button>
			<button class="bottomButton" on:click={() => onDropdownClick(".skillOptions")}>
				<img class="bottomButtonIcon" src={bookIcon} alt="skills"/>
				<span class="bottomButtonLabel">Skills</span>
			</button>
			<button class="bottomButton" on:click={() => onDropdownClick(".cheatsOptions")} style="background-color: rgb(237 139 139);">
				<img class="bottomButtonIcon" src={chainsIcon} alt="cheats"/>
				<span class="bottomButtonLabel">Cheats</span>
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
		min-height: 100dvh;
	}

	.bottomButtons {
		position: absolute;
		bottom: 50px;
		right: 0px;
	}

	.bottomButtonLabel {
		position: absolute;
    font-size: 15px;
		font-weight: 400;
    bottom: -22px;
    left: -3px;
    text-align: center;
    width: 70px;
    padding: 0;
		color: #000;
	}

	.bottomButtonIcon {
		margin-top: 4px;
	}

	.bottomButton {
		position: relative;
    width: 70px;
    height: 70px;
    border-radius: 35px;
		background: radial-gradient(circle, #8b0000, #8b0000);
    border-top: 4px groove #ffb000;
    border-left: 4px groove #ffb000;
    border-right: 4px ridge #ffb000;
    border-bottom: 4px ridge #ffb000;
		box-shadow: inset 0px 0px 5px 3px rgba(1,1,1,0.3);
	}

	.dropdown {
		display: none;
		position: absolute;
		bottom: 130px;
		right: 0px;
    flex-direction: column;
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

	.buildButtonResource {
		display: flex;
	}

	.buildButtonResources {
		display: flex;
		gap: 15px;
	}
</style>
