<template>
	<div id="reports-main-container">
		<div class="top-navbar">
			<router-link to="/reports/clients" class="top-navbar-link" @click="actual = 0"><h1>Clients</h1></router-link>
			<router-link to="/reports/products" class="top-navbar-link" @click="actual = 1"><h1>Products</h1></router-link>
			<router-link to="/reports/sales" class="top-navbar-link" @click="actual = 2"><h1>Sales</h1></router-link>
			<span class="active-indicator" :style="{ '--position': actual }"></span>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			actual: 1,
		};
	},
};
</script>

<style scoped>
#reports-main-container {
	display: grid;
	grid-template-rows: 60px auto;

	width: 100%;
	height: 100%;
}

.top-navbar {
	position: relative;

	display: grid;
	grid-template-columns: repeat(2, 33%) 34%;

	background-color: #5200bd;
	width: 100%;
	height: 100%;
}
.top-navbar-link {
	display: flex;
	justify-content: center;
	align-items: center;

	justify-self: center;
	align-self: center;

	color: #ffffff7a;
	text-decoration: none;
	text-transform: uppercase;
	font-family: Roboto-Light;
	font-size: 7px;

	height: 100%;
	width: 100%;

	transition-duration: 180ms;
}

.router-link-active {
	color: #fff;
}

.active-indicator {
	position: absolute;

	width: 34%;
	height: 3px;

	bottom: 0px;
	left: calc(calc(100% / 3) * var(--position));
	content: "hola";

	background-color: #0059ff;

	transition-duration: 200ms;
}
</style>
