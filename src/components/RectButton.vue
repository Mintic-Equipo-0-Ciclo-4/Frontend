<template>
	<button :class="{ main: main != undefined }">{{ content }}</button>
</template>

<script>
export default {
	props: ["content", "main"],
};
</script>

<style scoped>
button {
	width: 80%;
	height: 50px;

	border: solid #6600ee 1px;

	background-color: transparent;
	color: #6600ee;

	font-size: 18px;

	cursor: pointer;
	font-family: Roboto;
}

button.main {
	border: none;
	outline: none;

	background-color: #6600ee;
	color: #fff;
}
</style>
