<script lang="ts">
	import { resourcesStore } from '../stores/resourcesStore';
  import { RESOURCES } from '../configs/resourceConfig';
	import type { ResourceType } from '../util/types';

  export let onClose: () => void;
  let resourceList: ResourceType[];


  // Object.keys always returns string[], so you need to assert it as something
  // before using it.
  $: {
    resourceList = Object.keys($resourcesStore) as ResourceType[];
  }
</script>

<div class="inventoryModal">
  INVENTORY
  <button on:click={onClose} class="closeButton">✖️</button>
  <div class="resources">
    {#each resourceList as resource}
      <div class="resourceBox">
        <div class="resourceIcon">
          <img
            src={RESOURCES[resource].icon}
            alt={RESOURCES[resource].name}
          />
          <span>{$resourcesStore[resource]}</span>
        </div>
        <span class="resourceTitle">{RESOURCES[resource].name}</span>
      </div>
    {/each}
  </div>
</div>

<style>
	.inventoryModal {
		background: #dbd6d6;
    margin: 20px;
    border-radius: 10px;
    height: 78%;
    position: relative;
    z-index: 2;
		padding: 20px 20px;

    background: radial-gradient(circle, #8b0000, #8b0000);
    border-top: 4px ridge #ffb000;
    border-left: 4px groove #ffb000;
    border-right: 4px ridge #ffb000;
    border-bottom: 4px groove #ffb000;
    box-shadow: inset 0px 0px 5px 3px rgba(1,1,1,0.3);
    color: #ffc000;
    font-size: 18px;
    font-weight: 400;
    text-shadow: 0 1px 3px #000;
	}

  .closeButton {
    border-radius: 8px;
    font-family: 'Skranji', cursive;
    color: #d1d1d1;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    background: radial-gradient(circle, #ffb000, #ffb000);
    border: none;
    box-shadow: inset 0px 0px 5px 3px rgba(1,1,1,0.3);
    float: right;
    width: 30px;
    height: 30px;
  }

	.resources {
		display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    margin-top: 30px;
	}

	.resourceBox {
		display: flex;
    flex-direction: column;
    align-items: center;
    width: 72px;
    padding: 0;
    border-radius: 10px;
	}

	.resourceIcon {
		width: 30px;
    height: 30px;
    padding: 10px;
    position: relative;
	}

	.resourceIcon img {
		width: 30px;
    padding: 0;
	}

	.resourceIcon span {
		position: absolute;
    bottom: 0;
    right: 0;
    padding: 0;
	}

	.resourceTitle {
		padding: 0;
	}
</style>