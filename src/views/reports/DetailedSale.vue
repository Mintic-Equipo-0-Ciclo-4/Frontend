<template>
	<h1>Hola desde una venta detallada {{ $route.params.id }}</h1>
</template>

<script>
export default {
	setup() {},

	async created() {
		console.log("Hola");
	},
};
</script>
