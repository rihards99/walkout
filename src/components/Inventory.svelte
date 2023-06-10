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
    border: solid 1px black;
    height: 78%;
    position: relative;
    z-index: 2;
		padding: 10px 20px;
	}

  .closeButton {
    float: right;
    padding: 4px;
    font-size: 18px;
    line-height: 18px;
  }

	.resources {
		display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
	}

	.resourceBox {
		display: flex;
    flex-direction: column;
    align-items: center;
    width: 72px;
    padding: 0;
    border: solid 1px;
    background-color: #fff;
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