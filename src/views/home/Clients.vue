<template>
	<div class="clients-main-container">
		<h1>Clients</h1>
		<SearchBar placeholder="client" v-model="search"></SearchBar>
		<Table :data="tableData" :headers="tableHeaders" :template="'12% 18% 18% 26% 26%'"></Table>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";
import TextInput from "@/components/TextInput.vue";
import SearchBar from "@/components/SearchBar.vue";
import Table from "@/components/Table.vue";
import { mapActions } from "vuex";

export default {
	data() {
		return {
			search: "",
			tableData: [],
			tableHeaders: [],
		};
	},
	methods: {
		...mapActions(["getClients"]),
	},
	components: { RectButton, TextInput, SearchBar, Table },
	async created() {
		let response = await this.getClients();
		let clients = response.body;

		this.tableData = clients.map((value) => {
			let { cedula, nombre, telefono, email, direccion } = value;
			return { cedula, nombre, telefono, email, direccion };
		});

		this.tableHeaders = Object.keys(this.tableData[0]);
	},
};
</script>

<style scoped>
.clients-main-container {
	justify-self: center;
	align-self: center;

	display: grid;
	grid-template-rows: 75px 50px auto;

	width: 100%;
	height: 100%;
	max-height: 100%;

	/* box-shadow: 0px 0px 5px #747474; */

	overflow-y: hidden;
}

.clients-main-container h1 {
	font-family: Roboto-Light;
	align-self: flex-start;
	justify-self: center;

	margin-top: 10px;
	text-align: left;

	width: 95%;
}

.clients-main-container div:nth-last-child(1) {
	width: 95%;
}

@media screen and (min-width: 800px) {
	.clients-main-container {
		height: 820px;
		width: 1200px;

		/* box-shadow: 0px 0px 8px #a0a0a0; */

		/* outline: #6200ee solid 2px; */
	}
}
</style>
