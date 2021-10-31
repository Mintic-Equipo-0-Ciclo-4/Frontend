<template>
	<div id="navbar-div" :class="{ active }">
		<router-link class="navbar-link" to="/products">
			<img src="@/assets/logo.png" alt="" />
			<h1>Products</h1>
		</router-link>
		<router-link class="navbar-link" to="/clients">
			<img src="@/assets/logo.png" alt="" />
			<h1>Clients</h1>
		</router-link>
		<router-link class="navbar-link" to="/providers">
			<img src="@/assets/logo.png" alt="" />
			<h1>Providers</h1>
		</router-link>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ["active"],
};
</script>

<style scoped>
#navbar-div {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;

	position: absolute;
	top: 80px;
	left: -400px;

	width: 100%;
	height: calc(100% - 80px);

	background-color: #fff;

	transition-duration: 600ms;
	z-index: 1;
}

#navbar-div.active {
	left: 0px;
}
.navbar-link {
	display: grid;
	grid-template-columns: 80px auto;

	width: 95%;
	height: 60px;

	font-size: 12px;
	font-family: Roboto-Bold;
	text-decoration: none;
	text-align: left;
	color: #363640;

	margin-top: 30px;
	border-radius: 8px;

	transition-duration: 200ms;
}

.navbar-link img {
	justify-self: center;
	align-self: center;
	width: 35px;
}
.navbar-link h1 {
	justify-self: left;
	align-self: center;
	margin-left: 8px;
}

@media screen and (min-width: 813px) {
	#navbar-div {
		width: 400px;
		box-shadow: 5px 0px 5px #dadada;
		background-color: #fff;
	}
}

.router-link-active {
	color: #6600eb;
	background-color: #ece0fd;
}
</style>
