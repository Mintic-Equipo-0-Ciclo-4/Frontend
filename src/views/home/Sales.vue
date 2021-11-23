<template>
	<div class="sales-main-container" style="--template: auto 15% 33% 22%">
		<div class="sales-header">
			<TextInput v-model="cedula" placeholder="Cedula" class="cedula-input"></TextInput>
			<RectButton content="Consultar" class="btn-consultar-cliente" main></RectButton>
			<TextInput v-model="cliente" placeholder="Cliente" class="cedula-input" disabled="true"></TextInput>
			<TextInput v-model="consecutivo" placeholder="Consecutivo" class="cedula-input" disabled="true"></TextInput>
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
				<TextInput v-model="sale.codigo" placeholder="Codigo" disabled="true" class="codigo-input"></TextInput>
				<div class="valores-div">
					<TextInput
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
				<TextInput v-model="sale.valorTotal" placeholder="Valor Total" disabled="true" class="valor-total-input"></TextInput>
			</div>
		</div>
		<div class="sales-footer">
			<RectButton class="send-sale" content="Sale" main></RectButton>
			<div class="valores-div">
				<TextInput v-model="totalVenta" placeholder="Subtotal" disabled="true" class="valor-input"></TextInput>
				<TextInput v-model="totalIva" placeholder="Total Iva" disabled="true" class="valor-input"></TextInput>
				<TextInput v-model="totalConIva" placeholder="Valor Total" disabled="true" class="valor-input"></TextInput>
			</div>
		</div>
	</div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import RectButton from "@/components/RectButton.vue";
import SelectInput from "@/components/SelectInput.vue";

export default {
	async created() {
		let data = await fetch("/api/products", {
			method: "GET",
		});

		let body = await data.json();

		this.productos = body.map((product) => {
			let { codigo, nombre, ivaCompra, nitProveedor, precioCompra, precioVenta } = product;
			return { codigo, name: nombre, ivaCompra, nitProveedor, precioCompra, precioVenta };
		});
	},
	data() {
		return {
			cedula: { content: "" },
			cliente: { content: "" },
			consecutivo: { content: "" },
			sales: [
				{ selection: -1, codigo: { content: "" }, valorUnitario: { content: "" }, cantidad: 1, valorTotal: { content: "" } },
				{ selection: -1, codigo: { content: "" }, valorUnitario: { content: "" }, cantidad: 1, valorTotal: { content: "" } },
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
			this.sales[index].valorUnitario.content = producto.precioCompra;
			this.setSaleValue(index);
		},
		setSaleValue(index) {
			let producto = this.productos[this.sales[index].selection];
			this.sales[index].valorTotal.content = producto.precioCompra * this.sales[index].cantidad;
		},
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

.sales-footer .valores-div {
	justify-content: center;
	align-content: flex-end;
	flex-wrap: wrap;
}

.sales-footer .valores-div .valor-input {
	width: 90%;
	margin-top: 27px;
}
</style>
