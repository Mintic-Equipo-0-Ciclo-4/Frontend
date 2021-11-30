<template>
	<div class="report-sales-main-container"></div>
</template>

<script>
import Table from "@/components/Table.vue";
import { mapActions } from "vuex";
export default {
	setup() {},
	data() {
		return {
			clients: [],
			sales: [],
		};
	},
	components: { Table },
	methods: {
		...mapActions(["getClients"]),
	},
	async created() {
		let response = await this.getClients();
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

		this.clients = response.body;
	},
};
</script>

<style scoped>
.report-sales-main-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	height: 100%;
}
</style>
