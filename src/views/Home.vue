<template>
	<div id="main-container">
		<div id="title-div">
			<button id="navbar-toggler" @click="navbarActive = !navbarActive"></button>
			<h1 id="navbar-title">Clientes</h1>
		</div>
		<div id="navbar-div" :class="{ active: navbarActive }">
			<router-link to="/products" @click="navbarActive = false">Productos</router-link>
			<router-link to="/clients" @click="navbarActive = false">Clientes</router-link>
			<router-link to="/providers" @click="navbarActive = false">Proveedores</router-link>
		</div>
		<div id="view-div">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			navbarActive: false,
		};
	},
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
	/* box-shadow: 0px 5px 5px #bdbdbd; */

	z-index: 2;
}

#navbar-title {
	color: #fff;
	margin-left: 20px;
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

#navbar-div {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;

	position: absolute;
	top: -100%;

	width: 100%;
	height: calc(100% - 80px);

	background-color: #adadad;

	transition-duration: 600ms;
	z-index: 1;
}
#navbar-div.active {
	top: 80px;
}
#navbar-div a {
	width: 80%;
}
</style>
