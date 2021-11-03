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
		<RectButton content="Send" id="send-file-button" @click="sendFiles" main></RectButton>
	</div>
	<!-- <Dialog v-model="showDialog" v-if="showDialog" :title="dialogTitle" :content="dialogContent"></Dialog> -->
</template>

<script>
import FileLoader from "@/components/FileLoader.vue";
import RectButton from "@/components/RectButton.vue";
import Notification from "@/components/Notification.vue";
import { mapActions, mapMutations } from "vuex";

export default {
	data() {
		return {
			files: [],
		};
	},
	methods: {
		sendFiles() {
			if (this.files.length < 1) {
				this.spawnNotification({ text: "Por favor selecione un archivo" });
				return;
			}

			let reader = new FileReader();

			for (let file of this.files) {
				reader.readAsText(file, "UTF-8");
				reader.onload = async (ev) => {
					let result = ev.target.result;
					let json = this.toJson(result);
					let response = await this.uploadProducts({ productos: json });
					if (response.error) {
						switch (response.status) {
							case 401: {
								this.$store.state.auth = false;
								this.$router.push("login");
								break;
							}
							default: {
								this.spawnNotification({ text: "Error desconocido. Revise el trace de errores", error: true });
								console.trace("Error desconocido:", response);
							}
						}

						this.spawnNotification({ text: "Error al cargar los productos", error: true });
					} else {
						this.spawnNotification({ text: "Productos cargados correctamente" });
					}
				};
			}
		},
		toJson(text) {
			let array = text.split("\r").slice(0, -1);
			let titles = array[0].split(",");
			let json = [];

			for (let i = 1; i < array.length; i++) {
				let data = array[i].split(",");
				let temp = {};
				for (let j = 0; j < data.length; j++) {
					temp[titles[j]] = data[j].replace("\n", "");
				}
				json.push(temp);
			}
			return json;
		},
		...mapActions(["uploadProducts"]),
		...mapMutations(["spawnNotification"]),
	},
	components: { FileLoader, RectButton, Notification },
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
	font-family: Roboto-Light;
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
