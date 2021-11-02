<template>
	<button :class="{ main: main != undefined, text: text != undefined }">{{ content }}</button>
</template>

<script>
export default {
	props: ["content", "main", "text"],
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

	border-radius: 5px;
}

button.main {
	border: none;
	outline: none;

	background-color: #6600ee;
	color: #fff;
}

button.text {
	border: none;
	outline: none;

	transition-duration: 150ms;
}
</style>
