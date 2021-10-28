<template>
	<div id="main-container">
		<h1>Hola Mundo</h1>
	</div>
</template>

<style scoped>
#main-container {
	display: grid;
	grid-template-rows: 80px auto 120px;

	width: 100%;
	max-width: 800px;
	height: 100%;

	background-color: red;
}

@media screen and (min-width: 800px) {
	#main-container {
		height: 800px;

		background-color: blue;
	}
}
</style>
