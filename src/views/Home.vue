<template>
	<div id="main-container">
		<div id="title-div">
			<button id="navbar-toggler" @click="navbarActive = !navbarActive"></button>
			<h1 id="navbar-title">{{ $router.currentRoute._value.name }}</h1>
		</div>
		<div id="navbar-div" :class="{ active: navbarActive }">
			<router-link class="navbar-link" to="/products" @click="navbarActive = false">Productos</router-link>
			<router-link class="navbar-link" to="/clients" @click="navbarActive = false">Clientes</router-link>
			<router-link class="navbar-link" to="/providers" @click="navbarActive = false">Proveedores</router-link>
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

	background-color: #363640;

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
	display: grid;
	grid-template-rows: 70px 70px 70px auto;

	position: absolute;
	top: -100%;

	width: 100%;
	height: calc(100% - 80px);

	background-color: #363640;

	transition-duration: 600ms;
	z-index: 1;
}
#navbar-div.active {
	top: 80px;
}
#navbar-div a {
	width: 80%;
}
.navbar-link {
	justify-self: left;
	align-self: flex-end;

	font-size: 28px;
	font-family: Roboto-Bold;
	text-decoration: none;
	text-align: left;
	color: #ffffff;

	width: 1000px;

	/* margin-top: 40px; */
	margin-left: 50px;
}

#view-div {
	width: 100%;
	max-width: 100%;
	max-height: 100%;

	overflow: auto;
}

@media screen and (min-width: 813px) {
	#navbar-div {
		width: 500px;
	}
}
</style>
