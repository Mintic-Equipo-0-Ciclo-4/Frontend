<template>
	<div id="navbar-div" :class="{ active: modelValue }">
		<div id="profile-div">
			<div id="profile-image"><img src="@/assets/img/user.svg" /></div>
			<h1>{{ userData.nombre }}</h1>
			<h3>{{ userData.email }}</h3>
		</div>
		<div id="links-div">
			<router-link class="navbar-link" to="/products" @click="if (isMobile) modelValue = false;">
				<img src="@/assets/img/store.svg" alt="" class="svg-image" />
				<h1>Products</h1>
			</router-link>
			<router-link class="navbar-link" to="/clients" @click="if (isMobile) modelValue = false;">
				<img src="@/assets/img/clients.svg" alt="" />
				<h1>Clients</h1>
			</router-link>
			<router-link class="navbar-link" to="/providers" @click="if (isMobile) modelValue = false;">
				<img src="@/assets/img/providers.svg" alt="" />
				<h1>Providers</h1>
			</router-link>
			<router-link class="navbar-link" to="/sales" @click="if (isMobile) modelValue = false;">
				<img src="@/assets/img/sales.svg" alt="" />
				<h1>Sales</h1>
			</router-link>
			<div
				class="reports-menu"
				:class="{
					showing: !reportMenuHidden,
					highlight: $route.name.includes('Report') && reportMenuHidden,
				}"
			>
				<div class="drop-menu-header navbar-link" @click="reportMenuHidden = !reportMenuHidden">
					<img src="@/assets/img/reports.svg" alt="" />
					<h1>Reports</h1>
					<span class="triangle"></span>
				</div>
				<div class="drop-menu-body">
					<router-link class="navbar-link" to="/reports/clients" @click="if (isMobile) modelValue = false;">
						<img src="@/assets/img/clients.svg" alt="" />
						<h1>Clients</h1>
					</router-link>
					<router-link class="navbar-link" to="/reports/products" @click="if (isMobile) modelValue = false;">
						<img src="@/assets/img/report-products.svg" alt="" />
						<h1>Products</h1>
					</router-link>
					<router-link class="navbar-link" to="/reports/sales" @click="if (isMobile) modelValue = false;">
						<img src="@/assets/img/report-sales.svg" alt="" />
						<h1>Sales</h1>
					</router-link>
				</div>
			</div>

			<!-- <DropMenu :items="reportsItems" parentRoute="reports"></DropMenu> -->
		</div>
		<span class="section-divisor" />
		<div id="options-div">
			<router-link class="navbar-link" to="/profile" @click="if (isMobile) modelValue = false;">
				<img src="@/assets/img/settings.svg" alt="" />
				<h1>Settings</h1>
			</router-link>
			<a class="navbar-link" href="#">
				<img src="@/assets/img/info.svg" alt="" />
				<h1>About</h1>
			</a>
			<a class="navbar-link" href="/login" @click="closeSession">
				<img src="@/assets/img/logout.svg" alt="" />
				<h1>Logout</h1>
			</a>
		</div>
	</div>
</template>

<script>
import DropMenu from "@/components/DropMenu.vue";
import { mapActions, mapState } from "vuex";
import { onMounted, onUnmounted, ref } from "@vue/runtime-core";
export default {
	setup() {
		const windowSize = ref(window.innerWidth);

		onMounted(() => {
			window.addEventListener("resize", () => {
				windowSize.value = window.innerWidth;
			});
		});

		onUnmounted(() => {
			window.removeEventListener("resize", () => {
				windowSize.value = window.innerWidth;
			});
		});

		return { windowSize };
	},
	props: ["modelValue"],
	data() {
		return {
			reportMenuHidden: true,
		};
	},
	computed: {
		...mapState(["userData"]),
		isMobile() {
			return this.windowSize < 816;
		},
	},
	methods: {
		...mapActions(["closeSession"]),
	},
	watch: {
		modelValue() {
			this.$emit("update:modelValue", this.modelValue);
		},
	},
	components: { DropMenu },
};
</script>

<style scoped>
.section-divisor {
	margin-top: 12px;
	height: 0px;
	width: 95%;
	border: solid #b1b1b1;
	border-width: 1px 0px 0px 0px;
}

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

	overflow-y: auto;
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

#links-div {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.navbar-link {
	display: grid;
	grid-template-columns: 80px auto;

	width: 95%;
	height: 50px;

	font-size: 8px;
	font-family: Roboto;
	text-decoration: none;
	text-align: left;
	color: #363640;

	margin-top: 5px;
	border-radius: 4px;

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
	margin-left: 0px;
}

#options-div {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: center;
	margin-top: 2px;

	width: 100%;
	height: 200px;
}

.reports-menu {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	justify-self: right;
	width: 100%;
	overflow: hidden;
}

.reports-menu.highlight .drop-menu-header {
	color: #6600eb;
	background-color: #ece0fd;
}

.reports-menu.highlight .drop-menu-header img {
	filter: invert(10%) sepia(100%) saturate(6960%) hue-rotate(268deg) brightness(72%) contrast(121%);
}

.reports-menu.highlight .drop-menu-header .triangle {
	border-bottom: 6px #6600eb solid;
}

.reports-menu .drop-menu-header {
	position: relative;
	cursor: pointer;
	user-select: none;
}

.reports-menu .drop-menu-header .triangle {
	position: absolute;

	right: 10px;
	top: 18px;

	width: 0px;
	height: 0px;

	/* border-top: 6px #6600ee solid; */
	border-top: 6px transparent solid;
	border-right: 6px transparent solid;
	border-bottom: 6px #454545 solid;
	border-left: 6px transparent solid;

	transition-duration: 300ms;

	transform: rotate(180deg) translateY(-6px);
}

.reports-menu.showing .drop-menu-header .triangle {
	transform: rotate(0deg) translateY(0px);
}

.reports-menu .drop-menu-body {
	width: 100%;
	height: 0px;
	transition-duration: 200ms;
}
.reports-menu .drop-menu-body .navbar-link {
	margin-left: 35px;
	width: calc(100% - 45px);
}
.reports-menu.showing .drop-menu-body {
	height: 170px;
}

@media screen and (min-width: 813px) {
	#navbar-div {
		width: 360px;
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
	filter: invert(10%) sepia(100%) saturate(6960%) hue-rotate(268deg) brightness(72%) contrast(121%);
}
</style>
