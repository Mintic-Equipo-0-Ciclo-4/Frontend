<template>
	<div class="main-table-container" :class="{ 'with-template': template != null }" :style="{ '--template': template }">
		<div class="table-header">
			<h1 v-for="header of headers" :key="header.key">{{ header }}</h1>
		</div>
		<div class="table-body">
			<div class="table-row" v-for="object of data" :key="object.key">
				<div class="table-field" v-for="field of Object.values(object)" :key="field.key">{{ field }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["data", "headers", "template"],
	data() {
		return {};
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

.main-table-container.with-template .table-header {
	display: grid;
	grid-template-columns: var(--template);
}

.table-header {
	display: flex;
	justify-content: space-around;
	align-items: center;

	border: solid #b6b6b6;
	border-width: 0px 0px 1px 0px;
}

.table-header h1 {
	font-family: Roboto-Light;
	font-size: 16px;
	text-transform: capitalize;
	color: #1d1d1d;

	width: 100%;
	text-align: left;
}

.table-header h1:nth-child(1) {
	width: 70%;
}

.table-body {
	max-height: 100%;
	overflow-y: auto;
}

/*TODO: Mejorar el scrollbar en las tablas desktop*/

.table-body::-webkit-scrollbar {
	display: none;
}

.table-row {
	display: flex;
	height: 50px;
	justify-content: space-around;
	align-items: center;

	border: solid #b6b6b6;
	border-width: 0px 0px 1px 0px;
}

.main-table-container.with-template .table-row {
	display: grid;
	grid-template-columns: var(--template);
}

.table-field {
	width: 100%;
	text-align: left;
	overflow-x: hidden;
}

.table-field:nth-child(1) {
	width: 70%;
}
</style>
