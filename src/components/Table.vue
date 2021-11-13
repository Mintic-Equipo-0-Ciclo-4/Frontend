<template>
	<div class="main-table-container" :class="{ 'with-template': template != null }" :style="{ '--template': template }">
		<div class="table-header">
			<h1 v-for="header of headers" :key="header.key">{{ header }}</h1>
		</div>
		<div class="table-body">
			<div class="table-row" v-for="object of displayData" :key="object.key">
				<div class="table-field" v-for="field of Object.values(object)" :key="field.key">{{ field }}</div>
			</div>
		</div>
		<div class="table-options-div">
			<label>Rows per page </label>
			<input class="rows-per-page-input" type="number" v-model="rowsPerPage" @update:modelValue="page = 1" />
			<label>{{ start + 1 }}-{{ end > data.length ? data.length : end }} of {{ data.length }}</label>

			<button class="table-page-button full-back-button" @click="page = 1" :class="{ inactive: page === 1 }">
				<img src="@/assets/img/nav-first.svg" alt="" />
			</button>
			<button class="table-page-button back-button" @click="page < 2 ? null : page--" :class="{ inactive: page === 1 }">
				<img src="@/assets/img/nav-before.svg" alt="" />
			</button>
			<button
				class="table-page-button next-button"
				@click="page >= maxPages ? null : page++"
				:class="{ inactive: page === maxPages }"
			>
				<img src="@/assets/img/nav-next.svg" alt="" />
			</button>
			<button class="table-page-button full-next-button" @click="page = maxPages" :class="{ inactive: page === maxPages }">
				<img src="@/assets/img/nav-last.svg" alt="" />
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["data", "headers", "template"],
	data() {
		return {
			page: 1,
			rowsPerPage: 10,
		};
	},
	computed: {
		displayData() {
			return this.data.slice(this.start, this.end);
		},
		maxPages() {
			return Math.ceil(this.data.length / this.rowsPerPage);
		},
		start() {
			return (this.page - 1) * this.rowsPerPage;
		},
		end() {
			return this.start + this.rowsPerPage;
		},
	},
};
</script>

<style scoped>
.main-table-container {
	align-self: flex-end;
	justify-self: center;

	display: grid;
	grid-template-rows: 55px auto 55px;

	width: 100%;
	height: 95%;
	max-height: 100%;

	overflow: hidden;

	border: 1px #b6b6b6 solid;
	border-radius: 4px;
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
	margin-left: 16px;
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
	margin-left: 16px;
}

.table-options-div {
	display: grid;
	grid-template-columns: auto 80px 180px 40px 40px 40px 40px;

	height: 100%;

	border: solid #b6b6b6;
	border-width: 1px 0px 0px 0px;

	user-select: none;
}

.table-options-div > * {
	justify-self: center;
	align-self: center;
}

.table-options-div label {
	color: #333333;
}

.table-options-div label:nth-child(1) {
	margin-right: 10px;
	justify-self: right;
}
.table-options-div label:nth-child(3) {
	margin: 0px 30px;
}

.rows-per-page-input {
	height: 34px;
	width: 75px;

	background-color: transparent;
	border: solid 1px #686868;
	border-radius: 6px;
	outline: none;

	text-align: center;
	font-size: 16px;
	font-family: Roboto-Bold;

	color: #333333;
}

.table-page-button {
	width: 26px;
	height: 26px;

	margin: 0px 5px;

	border: none;
	outline: none;

	background-color: transparent;
	cursor: pointer;
}

.table-page-button img {
	width: 100%;
}

.table-page-button.inactive {
	pointer-events: none;
}

.table-page-button.inactive img {
	filter: invert(10%) sepia(100%) saturate(6960%) hue-rotate(268deg) brightness(92%) contrast(0%);
}
</style>
