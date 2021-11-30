<template>
	<div class="clients-main-container">
		<h1>Clients</h1>
		<SearchBar placeholder="client" v-model="search"></SearchBar>
		<Table
			:data="tableData"
			:headers="tableHeaders"
			:template="'12% 18% 18% 26% 26%'"
			:query="tableQuery"
			:deletable="true"
			:editable="true"
			:ondelete="tableDeleteClient"
			:onupdate="tableUpdateClient"
		></Table>
	</div>

	<button class="create-client-button" @click="showForm = !showForm">
		<span class="button-bar"></span>
		<span class="button-bar"></span>
	</button>

	<FloatForm
		v-model="formData"
		v-if="showForm"
		:title="`${updating ? 'Update' : 'New'} Client`"
		:send="send"
		@close-form="
			showForm = false;
			setDefaultForm();
		"
	></FloatForm>
</template>

<script>
import RectButton from "@/components/RectButton.vue";
import FloatForm from "@/components/FloatForm.vue";
import TextInput from "@/components/TextInput.vue";
import SearchBar from "@/components/SearchBar.vue";
import Table from "@/components/Table.vue";
import { mapActions, mapMutations } from "vuex";

export default {
	data() {
		return {
			search: "",
			tableData: [],
			tableHeaders: [],
			formData: [
				{ model: { content: "" }, name: "cedula" },
				{ model: { content: "" }, name: "telefono" },
				{ model: { content: "" }, name: "nombre" },
				{ model: { content: "" }, name: "email", email: true },
				{ model: { content: "" }, name: "direccion" },
			],
			showForm: false,
			updating: false,
		};
	},
	methods: {
		...mapActions(["getClients", "createClient", "deleteClient", "updateClient"]),
		...mapMutations(["spawnNotification"]),
		checkValid(index) {
			if (this.formData[index].model.content.length == 0) {
				this.formData[index].model.errors = ["Required field"];
				return false;
			}
			if (this.formData[index].model.errorCount) {
				if (this.formData[index].model.errorCount != 0) {
					return false;
				} else {
					return true;
				}
			}
			return true;
		},
		async send() {
			let cliente = {};
			let response;
			for (let i = 0; i < this.formData.length; i++) {
				if (!this.checkValid(i)) return;
				cliente[this.formData[i].name] = this.formData[i].model.content;
			}

			if (this.updating) {
				response = await this.updateClient(cliente);
			} else {
				response = await this.createClient(cliente);
			}

			if (response.error) {
				switch (response.status) {
					case 400:
						this.spawnNotification({ text: "Se ingreso un dato invalido o inexistente" });
						break;
					case 401:
						this.$store.state.auth = false;
						this.$router.push("login");
						break;
					case 409:
						let index = this.formData.findIndex((value) => value.name === response.body.conflictParam);
						this.formData[index].model.errors = ["Already exists"];
						break;
					default:
						this.spawnNotification({ text: "Error interno del servidor. Revisar el trace de errores" });
						console.trace(response);
				}
			} else {
				let text = `Cliente ${this.updating ? "actualizado" : "creado"} exitosamente`;
				this.spawnNotification({ text });
				this.showForm = false;
			}

			this.setClients();
		},
		async tableDeleteClient(client) {
			this.deleteClient(client);
			this.setClients();
			this.spawnNotification({ text: "Usuario eliminado exitosamente" });
		},
		async tableUpdateClient(client) {
			this.setUpdateForm(client);
			this.showForm = true;
		},
		async setClients() {
			let response = await this.getClients();
			let clients = response.body;

			if (response.error) {
				switch (response.status) {
					case 401:
						this.$store.state.auth = false;
						this.$router.push("login");
						break;
					default:
						this.spawnNotification({ text: "Error interno del servidor. Revisar el trace de errores" });
						console.trace(response);
				}

				return;
			}

			this.tableData = clients.map((value) => {
				let { cedula, nombre, telefono, email, direccion } = value;
				return { cedula, nombre, telefono, email, direccion };
			});

			this.tableHeaders = Object.keys(this.tableData[0]);
		},
		setDefaultForm() {
			this.formData = [
				{ model: { content: "" }, name: "cedula" },
				{ model: { content: "" }, name: "telefono" },
				{ model: { content: "" }, name: "nombre" },
				{ model: { content: "" }, name: "email", email: true },
				{ model: { content: "" }, name: "direccion" },
			];
			this.updating = false;
		},
		setUpdateForm(client) {
			this.updating = true;
			this.formData = [
				{ model: { content: client.cedula }, name: "cedula", disabled: true },
				{ model: { content: client.telefono }, name: "telefono" },
				{ model: { content: client.nombre }, name: "nombre" },
				{ model: { content: client.email }, name: "email", email: true },
				{ model: { content: client.direccion }, name: "direccion" },
			];
		},
	},
	computed: {
		tableQuery() {
			if (this.search == "") return null;
			return { nombre: this.search };
		},
	},
	components: { RectButton, TextInput, SearchBar, Table, FloatForm },
	async created() {
		this.setClients();
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

.create-client-button {
	position: absolute;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #6600ee;
	box-shadow: 0px 0px 6px #363636;

	width: 66px;
	height: 66px;

	border-radius: 50%;
	border: none;
	outline: none;

	right: 30px;
	bottom: 30px;

	cursor: pointer;
}

.create-client-button > span {
	position: absolute;

	width: 18px;
	height: 2px;

	background-color: #fff;
}

.create-client-button > span:nth-child(2) {
	transform: rotate(90deg);
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
