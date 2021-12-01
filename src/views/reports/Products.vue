<template>
	<div class="report-products-main-container">
		<div class="main-div">
			<h1 class="title">Report Products</h1>
			<SearchBar placeholder="product" v-model="search" class="search-bar"></SearchBar>

			<Table :data="tableData" :headers="tableHeaders"></Table>
			<!-- :template="'12% 14% 14% 16% 22% 22%'" -->
		</div>
	</div>
</template>

<script>
import Table from "@/components/Table.vue";
import SearchBar from "@/components/SearchBar.vue";

import { mapActions } from "vuex";

export default {
	data() {
		return {
			tableData: [],
			tableHeaders: ["hola", "adios"],
			search: "",
		};
	},
	methods: {
		...mapActions(["getProducts"]),
	},
	components: { Table, SearchBar },
	async created() {
		let response = await this.getProducts();
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

		this.tableData = response.body.map((product) => {
			let { codigo, ivaCompra, nitProveedor, nombre, precioCompra, precioVenta } = product;
			return {
				codigo,
				nombre,
				nitProveedor,
				ivaCompra: ivaCompra + "%",
				precioCompra: Intl.NumberFormat("en-US").format(precioCompra) + " $",
				precioVenta: Intl.NumberFormat("en-US").format(precioVenta) + " $",
			};
		});

		this.tableHeaders = ["codigo", "nombre", "nit proveedor", "iva compra", "precio compra", "precio venta"];
	},
};
</script>

<style scoped>
.report-products-main-container {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
	align-self: center;
}

.main-div {
	display: grid;
	grid-template-rows: 75px 50px auto;
	width: 100%;
	max-width: 1200px;
	height: 820px;
}

.search-bar {
	width: 100%;
}

.title {
	justify-self: left;
	align-self: center;
	font-size: 28px;

	font-family: Nunito-Light;
}
</style>
