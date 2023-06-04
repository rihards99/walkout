<div class="ui">
  <slot></slot>
  <div class="hiddenPlaceholder"></div>
</div>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Skranji:400,700" rel="stylesheet"> 
</svelte:head>

<style>
:global(.ui) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90vh;
  pointer-events: none; 
}

:global(.ui *) {
  pointer-events: auto;
  padding: 10px;
  font-family: 'Skranji', cursive;
}

.hiddenPlaceholder {
  display: none;
}
</style>