<template>
	<div class="search-bar-main-container" :class="{ filled }">
		<label class="search-placeholder">Search {{ placeholder }} by keyword</label>
		<input type="text" class="search-input" v-model="modelValue" @update:modelValue="$emit('update:modelValue', modelValue)" />
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
	border-width: 0px 0px 2px 0px;
	background-color: transparent;

	font-size: 18px;
	text-indent: 4px;
	color: #292929;

	transition-duration: 200ms;
}
.search-placeholder {
	position: absolute;
	top: calc(50% - 8px);
	left: 4px;

	pointer-events: none;
	color: #5c5c5c;

	transition-duration: 200ms;
}

.search-bar-main-container:focus-within .search-placeholder,
.search-bar-main-container.filled .search-placeholder {
	top: -10px;
	font-size: 14px;
	color: #5c5c5c;
}

.search-bar-main-container:focus-within .search-placeholder {
	color: #6600ee;
}
.search-bar-main-container:focus-within .search-input {
	border: solid #6f00ff;
	border-width: 0px 0px 2px 0px;
}
</style>
