<template>
	<div id="main-div">
		<router-view />
	</div>
</template>

<style>
@font-face {
	font-family: "Nunito";
	src: url("./assets/fonts/Nunito/Nunito-Regular.ttf");
}
@font-face {
	font-family: "Nunito-Light";
	src: url("./assets/fonts/Nunito/Nunito-Light.ttf");
}
@font-face {
	font-family: "Nunito-Bold";
	src: url("./assets/fonts/Nunito/Nunito-Bold.ttf");
}
@font-face {
	font-family: "Roboto";
	src: url("./assets/fonts/Roboto/Roboto-Regular.ttf");
}
@font-face {
	font-family: "Roboto-Light";
	src: url("./assets/fonts/Roboto/Roboto-Light.ttf");
}
@font-face {
	font-family: "Roboto-Bold";
	src: url("./assets/fonts/Roboto/Roboto-Bold.ttf");
}

* {
	padding: 0px;
	margin: 0px;
}

#app {
	font-family: Roboto;
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

	background: #e9e9e9;
}
</style>
