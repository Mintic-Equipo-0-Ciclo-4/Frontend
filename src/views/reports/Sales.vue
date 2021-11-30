<template>
	<div class="report-sales-main-container">
		<div class="main-div">
			<h3 class="title">Ventas por cliente</h3>
			<SearchBar placeholder="cliente" v-model="search" class="searchbar"></SearchBar>
			<Table
				:data="tableData"
				:headers="tableHeaders"
				:detailed="true"
				:ondetail="showDetails"
				template="15% 15% 10% 12% 12% 14% 22%"
			></Table>
		</div>
	</div>
</template>

<script>
import Table from "@/components/Table.vue";
import SearchBar from "@/components/SearchBar.vue";

import { mapActions, mapMutations } from "vuex";
export default {
	setup() {},
	data() {
		return {
			tableData: [],
			tableHeaders: [],
			search: "",
		};
	},
	components: { Table, SearchBar },
	methods: {
		...mapActions(["getClients", "getClientSales", "getSales"]),
		...mapMutations(["spawnNotification"]),
		showDetails(client) {
			if (client.ventasTotales <= 0) {
				this.spawnNotification({ text: "El cliente no ha realizado compras aun." });
				return;
			}

			this.$router.push("/reports/sales/" + client.cedula);
		},
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
					this.spawnNotification({ text: "Error interno del servidor. Revisar el trace de errores." });
					console.trace(response);
			}
			return;
		}

		let clients = response.body;
		let rawSales = (await this.getSales()).body;

		let sales = [];
		for (let client of clients) {
			// let sale = (await this.getClientSales(client.cedula)).body;
			let sale = rawSales.filter((value) => value.cedula == client.cedula);
			let temp = sale.map((value) => {
				let { cedula, consecutivo, productos, subtotal, totalIva, total } = value;
				return { cedula, consecutivo, productos, subtotal, totalIva, total };
			});
			sales.push(temp);
		}

		let temp = clients.map((client, index) => {
			let { cedula, nombre } = client;
			let ivaPagado = 0;
			let totalPagado = 0;
			let ventasTotales = sales[index].length;

			for (let sale of sales[index]) {
				ivaPagado += sale.totalIva;
				totalPagado += sale.total;
			}
			let sorted = sales[index].sort((a, b) => {
				let __a = a.consecutivo.slice(0, 10);
				let __b = b.consecutivo.slice(0, 10);

				return __a > __b;
			});

			let primeraCompra = sorted.length > 0 ? sorted[0].consecutivo.slice(0, 10) : "-";
			let ultimaCompra = sorted.length > 0 ? sorted.slice(-1)[0].consecutivo.slice(0, 10) : "-";

			return {
				cedula,
				nombre,
				ivaPagado: Intl.NumberFormat("en-US").format(ivaPagado) + "$",
				totalPagado: Intl.NumberFormat("en-US").format(totalPagado) + "$",
				ventasTotales,
				primeraCompra,
				ultimaCompra,
			};
		});

		this.tableData = temp;
		this.tableHeaders = ["cedula", "nombre", "iva pagado", "total pagado", "ventas totales", "primera compra", "ultima compra"];
		//["2021-02-02","2021-01-03","2021-01-02","2020-12-02"].sort()
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

.main-div {
	display: grid;
	grid-template-rows: 80px 50px auto;
	width: 100%;
	max-width: 1200px;
	height: 820px;
}

.title {
	justify-self: left;
	align-self: center;
	font-size: 28px;
	font-family: Nunito-Light;
}

.searchbar {
	width: 100%;
}
</style>
