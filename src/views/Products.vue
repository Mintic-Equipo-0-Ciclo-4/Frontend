<template>
	<div id="products-main-container">
		<h1>Upload Files</h1>
		<div class="file-loaded" v-for="file of files" :key="file.name">
			<img src="@/assets/img/csv.svg" alt="" />
			<h3>{{ file.name }}</h3>
			<div class="status-div">
				<span class="ok-bar"></span>
				<span class="ok-bar"></span>
			</div>
		</div>
		<FileLoader v-model="files"></FileLoader>
		<RectButton content="Send" id="send-file-button" main></RectButton>
	</div>
</template>

<script>
import FileLoader from "@/components/FileLoader.vue";
import RectButton from "@/components/RectButton.vue";

export default {
	setup() {},
	data() {
		return {
			message: "Hola",
			files: [],
		};
	},
	components: { FileLoader, RectButton },
};
</script>

<style scoped>
#products-main-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;

	width: 90%;
	max-width: 600px;
	height: 400px;

	margin-top: 30px;
}
#products-main-container h1 {
	width: 100%;
	font-size: 24px;
	font-family: Roboto-Light;
	margin-bottom: 20px;
}
#send-file-button {
	margin-top: 16px;
	width: 91%;
	max-width: 510px;
}
.file-loaded {
	width: 90%;
	max-width: 520px;
	height: 50px;

	display: grid;
	grid-template-columns: 50px max-content auto;

	margin-bottom: 15px;
}

.file-loaded img {
	justify-self: center;
	align-self: center;

	width: 70%;
}

.file-loaded h3 {
	justify-self: left;
	align-self: center;

	margin-left: 20px;
}

.status-div {
	position: relative;
}

.file-loaded .ok-bar {
	position: absolute;

	left: 15px;
	top: 25px;

	width: 12px;
	height: 4px;

	background-color: #6600ee;

	transform: translate(0px, 0px) rotate(45deg);
}
.file-loaded .ok-bar:nth-child(2) {
	width: 25px;
	height: 4px;

	top: 23px;
	left: 28px;

	transform: translate(-8px, -4px) rotate(-45deg);
}
</style>
