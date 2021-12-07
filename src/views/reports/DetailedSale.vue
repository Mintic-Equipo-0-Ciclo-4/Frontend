<template>
	<div class="detailed-sale-main-container">
		<div class="main-div">
			<div class="header">
				<button class="back-button" @click="$router.push('/reports/sales')">
					<img src="@/assets/img/back-arrow.svg" />
				</button>
				<h1 class="title">Cliente {{ client.nombre }}</h1>
			</div>
			<div class="sale-div" v-for="sale of sales" :key="sale.value">
				<div class="consecutivo-div">
					<h4>C {{ sale.consecutivo }} - {{ sale.sucursal }}</h4>
				</div>

				<Table :data="sale.productos" :headers="tableHeaders" class="sale-table"></Table>
				<div class="valores-div">
					<h1><span>Subtotal: </span>{{ sale.subtotal }}</h1>
					<h1><span>Total Iva:</span> {{ sale.totalIva }}</h1>
					<h1><span>Total: </span>{{ sale.total }}</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Table from "@/components/Table.vue";
import { mapActions } from "vuex";

export default {
	components: { Table },
	data() {
		return { sales: [], client: {}, tableHeaders: [] };
	},
	methods: {
		...mapActions(["getClient", "getClientSales"]),
	},
	async created() {
		let cedula = this.$route.params.id;
		let response = await this.getClient(cedula);

		if (response.error) {
			switch (response.status) {
				case 401:
					this.$store.state.auth = false;
					this.$router.push("login");
					break;
				case 404:
					this.$router.push("/reports/sales");
					break;
				default:
					this.spawnNotification({ text: "Error interno del servidor. Revisar el trace de errores." });
					console.trace(response);
			}
			return;
		}

		this.client = response.body;

		let sales = (await this.getClientSales(cedula)).body;
		this.sales = sales.map((value) => {
			let { consecutivo, productos, subtotal, total, totalIva, sucursal } = value;
			let __productos = productos.map((producto) => {
				let { nombre, codigo, cantidad, nitProveedor, ivaCompra, precioCompra, precioVenta } = producto;
				return {
					nombre,
					codigo,
					cantidad: cantidad,
					nitProveedor,
					ivaCompra: Intl.NumberFormat("en-US").format(ivaCompra) + "%",
					precioCompra: Intl.NumberFormat("en-US").format(precioCompra) + " $",
					precioVenta: Intl.NumberFormat("en-US").format(precioVenta) + " $",
				};
			});
			return {
				consecutivo,
				productos: __productos,
				subtotal: Intl.NumberFormat("en-US").format(subtotal) + " $",
				total: Intl.NumberFormat("en-US").format(total) + " $",
				totalIva: Intl.NumberFormat("en-US").format(totalIva) + " $",
				sucursal,
			};
		});

		this.tableHeaders = ["nombre", "codigo", "cantidad", "nit proveedor", "iva compra", "precio compra", "precio venta"];

		// let temp = { "2021-01": [1, 2, 3], "2021-02": [4, 5, 6], "2021-04": [7, 12, 316], "2021-08": [10, 221, 3154] };

		// for (let n in temp) {
		// 	console.log(temp[n]);
		// }
	},
};
</script>

<style scoped>
.detailed-sale-main-container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
}

.main-div {
	width: 60%;
}

.header {
	display: grid;
	grid-template-columns: 60px auto;

	height: 70px;

	margin-top: 25px;

	border: #b6b6b6 1px solid;
	border-radius: 4px;
}

.header .title {
	justify-self: left;
	align-self: center;
	font-family: Roboto-Light;
	text-indent: 25px;
	font-size: 22px;
}

.back-button {
	justify-self: center;
	align-self: center;

	border: none;
	background-color: transparent;

	cursor: pointer;
	height: 60px;
	width: 60px;
}

.back-button img {
	width: 70%;
	transition-duration: 300ms;
	filter: invert(10%) sepia(100%) saturate(6960%) hue-rotate(268deg) brightness(80%) contrast(0%);
}

.back-button:hover img {
	filter: invert(18%) sepia(98%) saturate(5533%) hue-rotate(267deg) brightness(81%) contrast(141%);
}

.sale-div {
	display: grid;
	grid-template-rows: 50px 400px 50px;
	margin-top: 20px;
	margin-bottom: 10px;

	/* padding: 20px;
	box-shadow: 0px 0px 20px #adadad; */
}

.sale-div .consecutivo-div {
	display: flex;
	justify-content: center;
	align-items: center;

	justify-self: left;
	align-self: flex-end;

	outline: 1px #b6b6b6 solid;
	border-radius: 4px 4px 0px 0px;

	height: 100%;
	width: 30%;

	font-size: 16px;
	font-family: Roboto-Light;
	color: #494949;
}

.sale-div .sale-table {
	align-self: flex-start;
	border-radius: 0px 4px 0px 4px;
	height: calc(100% - 2px);
}

.sale-div .valores-div {
	display: flex;
	align-items: flex-end;
	justify-self: right;
	width: 500px;
	outline: #b6b6b6 1px solid;
	border-radius: 0px 0px 4px 4px;
}

.sale-div .valores-div > * {
	display: flex;

	height: 100%;
	width: 100%;
	border: 1px #b6b6b6 solid;
	border-width: 0px 1px 0px 0px;

	align-items: center;
	text-indent: 6px;

	font-family: Roboto-Light;
	font-size: 16px;
	color: #505050;
}
.sale-div .valores-div span {
	font-family: Roboto-Light;
	color: #1d1d1d;
}

.sale-div .valores-div > *:nth-last-child(1) {
	border: 0px;
}
.sale-div .valores-div > *:nth-child(1) {
	width: 93%;
}
</style>
