<template>
	<div class="clients-main-container">
		<h1>Clients</h1>
		<SearchBar placeholder="client" v-model="search"></SearchBar>
		<div class="table-container"></div>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";
import TextInput from "@/components/TextInput.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
	data() {
		return {
			search: "",
		};
	},
	components: { RectButton, TextInput, SearchBar },
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

	box-shadow: 0px 0px 5px rgb(116, 116, 116);
}

.clients-main-container h1 {
	font-family: Roboto-Light;
	align-self: flex-start;
	justify-self: left;
	text-indent: 17px;
	margin-top: 10px;
}

@media screen and (min-width: 800px) {
	.clients-main-container {
		height: 650px;
		width: 600px;

		box-shadow: 0px 0px 8px #a0a0a0;

		/* outline: #6200ee solid 2px; */
	}
}
</style>
