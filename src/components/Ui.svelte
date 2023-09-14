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
  height: 100dvh;
  pointer-events: none; 
}

:global(.ui *) {
  pointer-events: auto;
  font-family: 'Skranji', cursive;
}

.hiddenPlaceholder {
  display: none;
}

:global(.btn) {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
    width: 250px;
    letter-spacing: 2px;
    border-radius: 8px;
    font-family: 'Skranji', cursive;
    color: #ffc000;
    font-size: 18px;
    font-weight: 400;
    text-shadow: 0 1px 3px #000;
    text-align: center;
    padding: 10px 0;
    background: radial-gradient(circle, #8b0000, #8b0000);
    border-top: 4px ridge #ffb000;
    border-left: 4px groove #ffb000;
    border-right: 4px ridge #ffb000;
    border-bottom: 4px groove #ffb000;
    box-shadow: inset 0px 0px 5px 3px rgba(1,1,1,0.3);
  }

  :global(.btn:active, .btn.active) {
    background: radial-gradient(circle, #ec6a6a, #e52b2b);
    box-shadow: 0px 0 5px 5px rgba(255,255,255,0.2)
  }

  :global(.btn:disabled) {
    margin: 10px auto;
    width: 250px;
    letter-spacing: 2px;
    border-radius: 8px;
    font-family: 'Skranji', cursive;
    color: #d1d1d1;
    font-size: 18px;
    font-weight: 400;
    text-shadow: 0 1px 3px #000;
    text-align: center;
    padding: 10px 0;
    background: radial-gradient(circle, #696969, #696969);
    border-top: 4px ridge #d1d1d1;
    border-left: 4px groove #d1d1d1;
    border-right: 4px ridge #d1d1d1;
    border-bottom: 4px groove #d1d1d1;
    box-shadow: inset 0px 0px 5px 3px rgba(1,1,1,0.3);
  }
</style>