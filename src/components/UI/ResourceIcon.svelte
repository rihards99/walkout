<script lang="ts">
  export let icon: string;
</script>

<img class="buildingIcon" src={icon} alt="Resource"/>

<style>
  .buildingIcon {
    background: #ffc000;
    width: 20px;
    height: 20px;
    padding: 2px;
    border-radius: 5px;
  }
</style>