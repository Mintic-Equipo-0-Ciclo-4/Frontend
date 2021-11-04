<template>
	<div class="clients-main-container">
		<h1>New Client</h1>
		<div class="inputs-div">
			<TextInput placeholder="Cedula" v-model="cedula" background="#e9e9e9" linecolor="#888" color="#666"></TextInput>
			<TextInput placeholder="Nombre" v-model="fullname" background="#e9e9e9" linecolor="#888" color="#666"></TextInput>
			<TextInput placeholder="Address" v-model="address" background="#e9e9e9" linecolor="#888" color="#666"></TextInput>
			<TextInput placeholder="Phone" v-model="phone" background="#e9e9e9" linecolor="#888" color="#666"></TextInput>
			<TextInput placeholder="Email" v-model="email" background="#e9e9e9" linecolor="#888" color="#666"></TextInput>
		</div>
		<RectButton content="Send" class="send-button" main></RectButton>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";
import TextInput from "@/components/TextInput.vue";

export default {
	data() {
		return {
			cedula: { content: "" },
			fullname: { content: "" },
			address: { content: "" },
			phone: { content: "" },
			email: { content: "" },
		};
	},
	components: { RectButton, TextInput },
};
</script>

<style scoped>
.clients-main-container {
	justify-self: center;
	align-self: center;

	display: grid;
	grid-template-rows: 40px auto 150px;

	width: 100%;
	height: 100%;

	box-shadow: 0px 0px 5px rgb(116, 116, 116);
}
.clients-main-container h1 {
	justify-self: left;
	align-self: center;

	font-family: Roboto-Light;
	font-size: 20px;

	margin-left: 60px;
}
.inputs-div {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;
}

.send-button {
	justify-self: center;
	align-self: flex-start;
	width: 81%;
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
