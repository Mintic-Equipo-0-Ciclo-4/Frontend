<template>
	<div class="main-table-container">
		<div class="table-header">
			<h1 v-for="header of headers" :key="header.key">{{ header }}</h1>
		</div>
		<div class="table-body">
			<div class="table-row" v-for="object of model" :key="object.key">
				<div class="table-field" v-for="field of Object.values(object)" :key="field.key">{{ field }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["model"],
	data() {
		return {
			headers: Object.keys(this.model[0]),
		};
	},
};
</script>

<style scoped>
.main-table-container {
	align-self: flex-end;
	justify-self: center;

	display: grid;
	grid-template-rows: 50px auto;

	width: 100%;
	height: 95%;
	max-height: 100%;

	overflow: hidden;
}

.table-header {
	display: flex;
	justify-content: space-around;
	align-items: center;

	border: solid #b6b6b6;
	border-width: 1px 0px 1px 0px;
}

.table-header h1 {
	font-family: Roboto-Light;
	font-size: 18px;
}

.table-body {
	max-height: 100%;
	overflow-y: auto;
}

.table-row {
	display: flex;
	height: 40px;
	justify-content: space-around;
	align-items: center;

	border: solid #b6b6b6;
	border-width: 0px 0px 1px 0px;
}

.table-field {
	width: 100%;
}
</style>
