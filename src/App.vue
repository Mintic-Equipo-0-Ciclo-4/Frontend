<template>
	<div id="main-div">
		<router-view />
		<Notification :text="notification.text" v-model="notification.show"></Notification>
	</div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import { mapState } from "vuex";

export default {
	setup() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);

		window.addEventListener("resize", () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	},
	components: { Notification },
	computed: { ...mapState(["notification"]) },
};
</script>

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
	-webkit-tap-highlight-color: transparent;
	text-align: center;
	color: #2c3e50;
}

#main-div {
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	max-height: 100vh;
	height: 100vh;
	height: calc(var(--vh, 1vh) * 100);

	background: #e9e9e9;

	overflow: hidden;
}
</style>
