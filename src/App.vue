<template>
	<div id="main-div">
		<router-view />
	</div>
</template>

<style>
* {
	padding: 0px;
	margin: 0px;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#main-div {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: 100vh;
}
</style>
