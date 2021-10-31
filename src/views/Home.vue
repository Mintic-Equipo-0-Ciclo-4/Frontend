<template>
	<div id="main-container">
		<div id="title-div">
			<button id="navbar-toggler" @click="navbarActive = !navbarActive"></button>
			<h1 id="navbar-title">{{ $router.currentRoute._value.name }}</h1>
		</div>
		<Navbar :active="navbarActive"></Navbar>
		<div id="view-div">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
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

	background-color: #363640;

	z-index: 2;
}

#navbar-title {
	color: #fff;
	margin-left: 40px;
}
#navbar-toggler {
	width: 50px;
	height: 50px;
	margin-left: 20px;

	background-color: #ffffff;
	border: none;
	outline: none;

	cursor: pointer;
}

#view-div {
	width: 100%;
	max-width: 100%;
	max-height: 100%;

	overflow: auto;
}
</style>
