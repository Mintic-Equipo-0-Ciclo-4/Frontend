<template>
	<div id="main-container">
		<div id="title-div">
			<button id="navbar-toggler" @click="navbarActive = !navbarActive" :class="{ active: navbarActive }">
				<!-- <img src="@/assets/menu.svg" /> -->
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<h1 id="navbar-title">{{ $router.currentRoute._value.name }}</h1>
		</div>
		<Navbar v-model="navbarActive"></Navbar>
		<div id="view-div" @click="navbarActive = false">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Navbar from "../../components/Navbar.vue";
export default {
	data() {
		return {
			navbarActive: false,
		};
	},
	components: { Navbar },
};
</script>

<style scoped>
#main-container {
	display: grid;
	grid-template-rows: 80px auto;

	width: 100%;
	height: 100%;
}

#title-div {
	display: flex;
	justify-content: left;
	align-items: center;

	background-color: #6600ee;
	/* background-color: #363640; */

	z-index: 2;
}

#navbar-title {
	color: #fff;
	margin-left: 40px;
	font-size: 22px;
	font-family: Roboto-Light;
}
#navbar-toggler {
	display: flex;
	justify-content: center;
	align-content: center;
	flex-wrap: wrap;
	position: relative;

	width: 50px;
	height: 50px;
	margin-left: 20px;

	background-color: transparent;
	border: none;
	outline: none;

	cursor: pointer;

	transition-duration: 0.5s;
}

#navbar-toggler span {
	width: 40px;
	height: 5px;

	background-color: rgb(255, 255, 255);

	margin-top: 5px;

	transition-duration: 0.2s;
}

#navbar-toggler.active span:nth-child(1) {
	transform: translate(-10px, 5px) rotate(-45deg);
	width: 33px;
}
#navbar-toggler.active span:nth-child(2) {
	transform: translate(3px, 5px);
	width: 40px;
}
#navbar-toggler.active span:nth-child(3) {
	transform: translate(3px, -5px);
	width: 40px;
}
#navbar-toggler.active span:nth-child(4) {
	transform: translate(-10px, -5px) rotate(45deg);
	width: 33px;
}
#view-div {
	display: flex;
	justify-content: center;
	align-content: flex-start;
	width: 100%;
	max-width: 100%;
	max-height: 100%;

	overflow: auto;
}
</style>
