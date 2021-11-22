<template>
	<div class="sales-main-container" style="--template: auto 15% 33% 22%">
		<div class="sales-header">
			<TextInput v-model="cedula" placeholder="Cedula" class="cedula-input"></TextInput>
			<RectButton content="Consultar" class="btn-consultar-cliente" main></RectButton>
			<TextInput v-model="cliente" placeholder="Cliente" class="cedula-input" disabled="true"></TextInput>
			<TextInput v-model="consecutivo" placeholder="Consecutivo" class="cedula-input" disabled="true"></TextInput>
		</div>
		<div class="sales-body">
			<div v-for="sale of sales" :key="sale.key" class="sale">
				<SelectInput :options="productos" v-model="sale.nombre" background="#e9e9e9" height="48"></SelectInput>
				<TextInput v-model="sale.codigo" placeholder="Codigo" disabled="true" class="codigo-input"></TextInput>
				<div class="valores-div">
					<TextInput
						v-model="sale.valorUnitario"
						placeholder="Valor Unitario"
						disabled="true"
						class="valor-unitario-input"
					></TextInput>
					<div class="cantidad-input"></div>
				</div>
				<TextInput v-model="sale.valorTotal" placeholder="Valor Total" disabled="true" class="valor-total-input"></TextInput>
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
			console.log();
			return product.nombre;
		});
	},
	data() {
		return {
			cedula: { content: "" },
			cliente: { content: "" },
			consecutivo: { content: "" },
			sales: [{ nombre: "", codigo: { content: "" }, valorUnitario: { content: "" }, valorTotal: { content: "" } }],
			productos: [],
		};
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
	width: 95px;
	height: 50px;

	background-color: white;
}
</style>
