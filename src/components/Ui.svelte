<div class="ui">
  <slot></slot>
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
  height: 100%;
  pointer-events: none;
}

:global(.ui > *) {
  pointer-events: auto;
  font-family: 'Skranji', cursive;
  padding: 10px;
}
</style>