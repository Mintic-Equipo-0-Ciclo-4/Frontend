<template>
	<div class="clients-main-container">
		<h1>Clients</h1>
		<SearchBar placeholder="client" v-model="search"></SearchBar>
		<Table :model="model"></Table>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";
import TextInput from "@/components/TextInput.vue";
import SearchBar from "@/components/SearchBar.vue";
import Table from "@/components/Table.vue";

export default {
	data() {
		return {
			search: "",
			model: [
				{
					nombre: "thomas",
					edad: 16,
					ciudad: "cajica",
				},
				{
					nombre: "angie",
					edad: 17,
					ciudad: "cajica",
				},
				{
					nombre: "juan",
					edad: 19,
					ciudad: "cajica",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
				{
					nombre: "maria",
					edad: 15,
					ciudad: "bogota",
				},
			],
		};
	},
	components: { RectButton, TextInput, SearchBar, Table },
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

	box-shadow: 0px 0px 5px #747474;

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
		height: 650px;
		width: 1000px;

		box-shadow: 0px 0px 8px #a0a0a0;

		/* outline: #6200ee solid 2px; */
	}
}
</style>
