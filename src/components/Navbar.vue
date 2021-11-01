<template>
	<div id="navbar-div" :class="{ active }">
		<div id="profile-div">
			<div id="profile-image"><img src="@/assets/img/user.svg" alt="" srcset="" /></div>
			<h1>{{ userData.nombre }}</h1>
			<h3>{{ userData.email }}</h3>
		</div>
		<router-link class="navbar-link" to="/products">
			<img src="@/assets/img/store.svg" alt="" class="svg-image" />
			<h1>Products</h1>
		</router-link>
		<router-link class="navbar-link" to="/clients">
			<img src="@/assets/img/clients.svg" alt="" />
			<h1>Clients</h1>
		</router-link>
		<router-link class="navbar-link" to="/providers">
			<img src="@/assets/img/providers.svg" alt="" />
			<h1>Providers</h1>
		</router-link>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(["userData"]),
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
	left: -100%;

	width: 100%;
	height: calc(100% - 80px);

	background-color: #fff;

	transition-duration: 400ms;
	z-index: 1;
}

#navbar-div.active {
	left: 0px;
}

#profile-div {
	display: grid;
	grid-template-rows: auto 35px 35px;

	width: 95%;
	height: 170px;

	border: solid #b1b1b1;
	border-width: 0px 0px 1px 0px;
}

#profile-image {
	display: flex;
	justify-content: left;
}
#profile-image img {
	align-self: center;
	height: 85px;
}

#profile-div h1 {
	align-self: flex-end;
	justify-self: left;

	font-size: 26px;
	margin-left: 10px;
	font-family: Roboto-Bold;
}
#profile-div h3 {
	justify-self: left;
	margin-left: 13px;

	color: #868686;
	font-family: Roboto-Light;
	font-size: 14px;
}

.navbar-link {
	display: grid;
	grid-template-columns: 80px auto;

	width: 95%;
	height: 50px;

	font-size: 9px;
	font-family: Roboto;
	text-decoration: none;
	text-align: left;
	color: #363640;

	margin-top: 10px;
	border-radius: 8px;

	transition-duration: 200ms;
}

.navbar-link img {
	justify-self: left;
	margin-left: 10px;
	align-self: center;
	width: 32px;
}
.navbar-link h1 {
	justify-self: left;
	align-self: center;
	margin-left: 4px;
}

@media screen and (min-width: 813px) {
	#navbar-div {
		width: 400px;
		left: -400px;
		box-shadow: 5px 0px 5px #dadada;
		background-color: #fff;
	}
}

.router-link-active {
	color: #6600eb;
	background-color: #ece0fd;
}

.router-link-active img {
	filter: invert(10%) sepia(100%) saturate(6960%) hue-rotate(271deg) brightness(85%) contrast(121%);
}
</style>
