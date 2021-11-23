<template>
	<div class="sales-main-container" style="--template: auto 15% 33% 22%">
		<div class="sales-header">
			<TextInput
				background="#e9e9e9"
				linecolor="#999999"
				color="#666666"
				v-model="cedula"
				placeholder="Cedula"
				class="cedula-input"
			></TextInput>
			<RectButton content="Consultar" class="btn-consultar-cliente" @click="salesGetClient" main></RectButton>
			<TextInput
				background="#e9e9e9"
				linecolor="#999999"
				color="#666666"
				v-model="cliente"
				placeholder="Cliente"
				class="cedula-input"
				disabled="true"
				tabindex="-1"
			></TextInput>
			<TextInput
				background="#e9e9e9"
				linecolor="#999999"
				color="#666666"
				v-model="consecutivo"
				placeholder="Consecutivo"
				class="cedula-input"
				disabled="true"
			></TextInput>
		</div>
		<div class="sales-body">
			<div v-for="(sale, index) of sales" :key="sale.key" class="sale">
				<SelectInput
					:options="productos"
					v-model="sale.selection"
					background="#e9e9e9"
					height="50"
					placeholder="Producto"
					@update="setSaleData(index)"
				></SelectInput>
				<TextInput
					background="#e9e9e9"
					linecolor="#999999"
					color="#666666"
					v-model="sale.codigo"
					placeholder="Codigo"
					disabled="true"
					class="codigo-input"
				></TextInput>
				<div class="valores-div">
					<TextInput
						background="#e9e9e9"
						linecolor="#999999"
						color="#666666"
						v-model="sale.valorUnitario"
						placeholder="Valor Unitario"
						disabled="true"
						class="valor-unitario-input"
					></TextInput>
					<input
						type="number"
						min="1"
						max="100"
						class="cantidad-input"
						v-model="sale.cantidad"
						@update:modelValue="setSaleValue(index)"
						:disabled="sale.selection == -1"
					/>
				</div>
				<TextInput
					background="#e9e9e9"
					linecolor="#999999"
					color="#666666"
					v-model="sale.valorTotal"
					placeholder="Valor Total"
					disabled="true"
					class="valor-total-input"
				></TextInput>
			</div>
		</div>
		<div class="sales-footer">
			<RectButton class="new-sale" content="Add Product" @click="newSale"></RectButton>
			<RectButton class="send-sale" content="Sale" @click="sendSale" main></RectButton>
			<div class="valores-div">
				<TextInput
					background="#e9e9e9"
					linecolor="#999999"
					color="#666666"
					v-model="totalVenta"
					placeholder="Subtotal"
					disabled="true"
					class="valor-input"
				></TextInput>
				<TextInput
					background="#e9e9e9"
					linecolor="#999999"
					color="#666666"
					v-model="totalIva"
					placeholder="Total Iva"
					disabled="true"
					class="valor-input"
				></TextInput>
				<TextInput
					background="#e9e9e9"
					linecolor="#999999"
					color="#666666"
					v-model="totalConIva"
					placeholder="Valor Total"
					disabled="true"
					class="valor-input"
				></TextInput>
			</div>
		</div>
	</div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import RectButton from "@/components/RectButton.vue";
import SelectInput from "@/components/SelectInput.vue";
import { mapActions, mapMutations } from "vuex";

export default {
	data() {
		return {
			cedula: { content: "" },
			cliente: { content: "" },
			consecutivo: { content: "" },
			sales: [
				{ selection: -1, codigo: { content: "" }, valorUnitario: { content: "" }, cantidad: 1, valorTotal: { content: "" } },
			],
			totalVenta: { content: "" },
			totalIva: { content: "" },
			totalConIva: { content: "" },
			productos: [],
		};
	},
	methods: {
		setSaleData(index) {
			let producto = this.productos[this.sales[index].selection];
			this.sales[index].codigo.content = producto.codigo;
			this.sales[index].valorUnitario.content = producto.precioVenta;
			this.setSaleValue(index);
		},
		setSaleValue(index) {
			let producto = this.productos[this.sales[index].selection];
			this.sales[index].valorTotal.content = producto.precioVenta * this.sales[index].cantidad;
		},
		async salesGetClient() {
			let cedula = this.cedula.content;
			if (cedula === "") {
				this.cedula.errors = ["Required"];
				return;
			}
			let data = await this.getClient(this.cedula.content);
			if (data.error) {
				switch (data.status) {
					case 401:
						this.$store.state.auth = false;
						this.$router.push("login");
						break;
					case 404:
						this.cedula.errors = ["Client not found"];
						break;
					default:
						this.spawnNotification({ text: "Error interno del servidor. Revisar el trace de errores" });
						console.trace(response);
				}
				this.cliente.content = "";
				this.cedula.validContent = undefined;
				this.consecutivo.content = "";

				return;
			}

			let date = new Date();
			this.cliente.content = data.body.nombre;
			this.cedula.validContent = cedula;
			this.consecutivo.content = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date
				.getTime()
				.toString()
				.slice(5, -1)}`;
		},
		resetFields() {
			this.cedula.content = "";
			this.cliente.content = "";
			this.consecutivo.content = "";
			this.sales = [
				{ selection: -1, codigo: { content: "" }, valorUnitario: { content: "" }, cantidad: 1, valorTotal: { content: "" } },
			];
		},
		async sendSale() {
			let cedula = this.cedula.validContent;
			let cliente = this.cliente.content;
			let consecutivo = this.consecutivo.content;
			let productos = [];

			if (!cedula || !cliente || !consecutivo) {
				this.cedula.errors = ["Required"];
				return;
			}

			for (let sale of this.sales) {
				if (sale.selection != -1) {
					let { cantidad } = sale;
					let temp = { cantidad, ...this.productos[sale.selection] };
					temp.nombre = temp.name;
					delete temp.name;
					productos.push(temp);
				}
			}
			let data = {
				cedula,
				consecutivo,
				productos,
				subtotal: this.totalVenta.content,
				totalIva: this.totalIva.content,
				total: this.totalConIva.content,
			};
			let response = await this.postSale(data);

			if (response.error) {
				switch (response.status) {
					case 400:
						this.spawnNotification({ text: "Error de peticion 400" });
						break;
					case 401:
						this.$store.state.auth = false;
						this.$router.push("login");
						break;
					case 404:
						this.spawnNotification({ text: "Error 404" });
						break;
					default:
						this.spawnNotification({ text: "Error interno del servidor. Revisar el trace de errores" });
						console.trace(response);
				}

				return;
			} else {
				this.resetFields();
				this.spawnNotification({ text: "Venta creada correctamente" });
			}
		},

		newSale() {
			this.sales.push({
				selection: -1,
				codigo: { content: "" },
				valorUnitario: { content: "" },
				cantidad: 1,
				valorTotal: { content: "" },
			});
		},

		...mapActions(["getClient", "getProducts", "postSale"]),
		...mapMutations(["spawnNotification"]),
	},
	computed: {
		totales() {
			let subtotal = 0,
				iva = 0;
			for (let sale of this.sales) {
				if (sale.selection != -1) {
					subtotal += sale.valorTotal.content;
					iva += sale.valorTotal.content * (this.productos[sale.selection].ivaCompra / 100);
				}
			}

			this.totalVenta.content = subtotal == 0 ? "" : subtotal;
			this.totalIva.content = iva == 0 ? "" : iva;
			this.totalConIva.content = subtotal + iva == 0 ? "" : subtotal + iva;

			return { subtotal, iva, total: subtotal + iva };
		},
	},
	watch: {
		totales() {},
	},
	components: { SelectInput, TextInput, RectButton },
	async created() {
		let data = await this.getProducts();
		if (data.error) {
			switch (data.status) {
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
		let body = data.body;

		this.productos = body.map((product) => {
			let { codigo, nombre, ivaCompra, nitProveedor, precioCompra, precioVenta } = product;
			return { codigo, name: nombre, ivaCompra, nitProveedor, precioCompra, precioVenta };
		});
	},
};
</script>

<style scoped>
.sales-main-container {
	display: flex;
	justify-content: center;
	align-content: flex-start;
	flex-wrap: wrap;

	width: 100%;
	height: 100%;

	overflow: hidden;
}

.sales-main-container * {
	margin: 0px;
}

.sales-header {
	display: grid;
	grid-template-columns: auto 15% 35% 20%;
	grid-template-columns: var(--template);

	height: 100px;
	width: 90%;
	max-width: 1200px;

	margin-top: 20px;
}
.sales-header > * {
	justify-self: center;
	align-self: center;

	margin: 0px;
	width: 90%;
}
.btn-consultar-cliente {
	justify-self: left;
	align-self: center;
}

.sales-body {
	width: 90%;
	max-width: 1200px;

	height: 50%;
	overflow-y: auto;

	border: solid rgb(204, 204, 204);
	border-width: 1px 0px 1px 0px;

	/* padding: 20px 0px; */
}

.sale {
	display: grid;
	grid-template-columns: var(--template);

	width: 100%;
	height: 77px;
}

.sale > * {
	justify-self: center;
	align-self: center;
	margin: 0px;
	width: 90%;
}

.codigo-input {
	justify-self: left;
}

.valores-div {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.valor-unitario-input {
	width: 70%;
}

.cantidad-input {
	height: 48px;
	width: 75px;

	background-color: transparent;
	border: solid 1px #686868;
	border-radius: 6px;
	outline: none;

	text-align: center;
	font-size: 18px;
	font-family: Roboto-Bold;

	color: #363636;
}

.sales-footer {
	display: grid;
	grid-template-columns: var(--template);

	width: 90%;
	max-width: 1200px;

	height: 245px;
	/* background-color: #b9b9b9; */
}

.send-sale {
	justify-self: center;
	align-self: flex-end;
	width: 90%;

	grid-column-start: 3;
	grid-column-end: 4;
}

.new-sale {
	width: calc(100% - 34px);
	justify-self: center;
	align-self: flex-end;
	grid-column: 1/3;
}

.sales-footer .valores-div {
	justify-content: center;
	align-content: flex-end;
	flex-wrap: wrap;
}

.sales-footer .valores-div .valor-input {
	width: 90%;
	margin-top: 27px;
}

/**Scrollbar */

.sales-body::-webkit-scrollbar {
	background-color: #fff;
	width: 16px;
	display: none;
}

.sales-body::-webkit-scrollbar-track {
	background-color: #e9e9e9;
}

.sales-body::-webkit-scrollbar-thumb {
	background-color: #babac0;
	border-radius: 16px;
	border: 5px solid #e9e9e9;
}
.sales-body::-webkit-scrollbar-thumb:hover {
	background-color: #a0a0a5;
	border: 4px solid #e9e9e9;
}

.sales-body::-webkit-scrollbar-button {
	display: none;
}
</style>
