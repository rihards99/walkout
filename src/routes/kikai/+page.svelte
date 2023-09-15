<svelte:head>
	<title>Daudz laimes dzimšanas dienā</title>
	<meta name="description" content="About this app" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300&display=swap" rel="stylesheet">

</svelte:head>


<body>
	<div class="confettiContainer">
		<div class="confetti"></div>
		<div class="confetti"></div>
		<div class="confetti"></div>
		<div class="confetti"></div>
		<div class="confetti"></div>
		<div class="confetti"></div>
		<div class="confetti"></div>
		<div class="confetti"></div>
		<div class="confetti"></div>
	</div>
	<div class="text">
		<h1>Daudz laimes dzimšanas dienā</h1>
	
		<p>
			Šī lapa ir domāta, lai dzimšanas dienā sveiktu manu vismīļāko <b>Kristiānu Doktori</b>.
		</p>
	
		<p>
			Viņa ir visjaukākā un visbrīnišķīgākā <b>lovomalaif</b>. Lai tev krāšņa un smaidiem pilna šī diena.
		</p>
	
		<p>
			Tu esi DAIMON-D 💎
		</p>
	</div>
	
	<iframe width="500" height="300" src="https://www.youtube.com/embed/oofSnsGkops?si=KRHBHmz9QOL7ZWFv&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
	<!-- <iframe src="https://vid.puffyan.us/embed/oofSnsGkops" title="YouTube video player"></iframe> -->
</body>

<style>
	.text {
		font-family: 'Kalam', cursive;
		padding: 20px;
	}

	:global(body) {
		 margin: 0;
		 background-color: #FAF9F6;
	}

	h1 {
		font-size: 2.5em;
    text-align: center;
	}

	p {
		font-size: 1.5em;
		text-align: justify;
	}

	iframe {
    width: 100%;
	}

	b {
		font-weight: 900;
		color: #ff6961;
	}

	.confettiContainer {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.confetti {
		width: 15px;
		height: 15px;
		background-color: #f2d74e;
		position: absolute;
		left: 50%;
		animation: confetti 5s ease-in-out -2s infinite;
		transform-origin: left top;
	}
	.confetti:nth-child(1) {
		background-color: #f2d74e; left: 10%; animation-delay: 0;
	}
	.confetti:nth-child(2) {
		background-color: #95c3de; left: 20%; animation-delay: -5s;
	}
	.confetti:nth-child(3) {
		background-color: #ff9a91; left: 30%; animation-delay: -3s;
	}
	.confetti:nth-child(4) {
		background-color: #f2d74e; left: 40%; animation-delay: -2.5s;
	}
	.confetti:nth-child(5) {
		background-color: #95c3de; left: 50%; animation-delay: -4s;
	}
	.confetti:nth-child(6) {
		background-color: #ff9a91; left: 60%; animation-delay: -6s;
	}
	.confetti:nth-child(7) {
		background-color: #f2d74e; left: 70%; animation-delay: -1.5s;
	}
	.confetti:nth-child(8) {
		background-color: #95c3de; left: 80%; animation-delay: -2s;
	}
	.confetti:nth-child(9) {
		background-color: #ff9a91; left: 90%; animation-delay: -3.5s;
	}
	.confetti:nth-child(10) {
		background-color: #f2d74e; left: 100%; animation-delay: -2.5s;
	}

	@keyframes confetti {
		0% { transform: rotateZ(15deg) rotateY(0deg) translate(0,0); }
		25% { transform: rotateZ(5deg) rotateY(360deg) translate(-5vw,20vh); }
		50% { transform: rotateZ(15deg) rotateY(720deg) translate(5vw,60vh); }
		75% { transform: rotateZ(5deg) rotateY(1080deg) translate(-10vw,80vh); }
		100% { transform: rotateZ(15deg) rotateY(1440deg) translate(10vw,110vh); }
	}
</style>
