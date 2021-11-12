<template>
	<div class="search-bar-main-container" :class="{ filled }">
		<label class="search-placeholder">Search {{ placeholder }} by keyword</label>
		<input type="text" class="search-input" v-model="modelValue" @update:modelValue="$emit('update:modelValue', modelValue)" />
		<button class="search-button">
			<img src="@/assets/img/search.svg" alt="" />
		</button>
	</div>
</template>

<script>
export default {
	props: ["placeholder", "modelValue"],
	computed: {
		filled() {
			return this.modelValue.length !== 0;
		},
	},
};
</script>

<style scoped>
.search-bar-main-container {
	justify-self: center;

	position: relative;
	width: 95%;
}
.search-input {
	width: 100%;
	height: 100%;

	outline: none;
	border: solid #b1b1b1;
	border-width: 1px 1px 1px 1px;
	background-color: transparent;

	font-size: 17px;
	text-indent: 16px;
	color: #292929;

	transition-duration: 200ms;
	border-radius: 4px;
}
.search-placeholder {
	position: absolute;
	top: calc(50% - 8px);
	left: 8px;

	pointer-events: none;
	color: #5c5c5c;

	transition-duration: 200ms;
	background-color: #e9e9e9;

	padding: 0px 10px;
}

.search-button {
	position: absolute;

	width: 52px;
	height: 52px;

	top: 0px;
	right: -2px;

	border-radius: 0px 4px 4px 0px;

	border: none;
	outline: none;

	cursor: pointer;

	background-color: #6600ee;
}

.search-button img {
	width: 55%;
}

.search-bar-main-container:focus-within .search-placeholder,
.search-bar-main-container.filled .search-placeholder {
	top: -8px;
	font-size: 14px;
	color: #5c5c5c;
}

.search-bar-main-container:focus-within .search-placeholder {
	color: #6600ee;
}
.search-bar-main-container:focus-within .search-input {
	border: solid #6f00ff;
	border-width: 1px 1px 1px 1px;
}
</style>
