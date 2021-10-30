<template>
	<div id="main-container">
		<h1>404</h1>
		<h3>It looks like you are lost</h3>
		<div id="button-container">
			<RectButton content="Go to home page" main @click="this.$router.push('/')"></RectButton>
		</div>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";
export default {
	components: {
		RectButton,
	},
};
</script>

<style scoped>
#main-container {
	display: flex;
	justify-content: center;
	align-content: center;
	flex-wrap: wrap;

	width: 100%;
	height: 100%;

	background-color: #ffffff;
	color: #383838;
}
h1 {
	width: 100%;

	font-size: 200px;
	font-family: Roboto-light;
	text-align: center;
}
h3 {
	font-size: 35px;
	font-family: Roboto-light;

	color: #a7a7a7;

	margin: 20px 0px;
	width: 100%;

	text-align: center;
}
#button-container {
	width: 80%;
	max-width: 520px;

	margin-top: 20px;
}
</style>
