<template>
	<div
		class="select-input-main-container"
		@click="hidden = !hidden"
		:class="{ hidden }"
		:style="{
			'--time': '300ms',
			'--background': background,
			'--height': options.length * height + 'px',
			'--option-height': height + 'px',
		}"
	>
		<div class="options-container">
			<div class="select-option" v-for="option of options" :key="option.key" @click="selection = option">
				<h4>{{ option }}</h4>
			</div>
		</div>
		<h4 class="selected-option">{{ selection }}</h4>
		<span class="triangle"></span>
	</div>
</template>

<script>
export default {
	props: ["modelValue", "options", "background", "height"],
	data() {
		return {
			hidden: true,
			selection: this.options[0],
		};
	},
	watch: {
		selection() {
			this.$emit("update:modelValue", this.selection);
		},
	},
};
</script>

<style scoped>
.select-input-main-container {
	position: relative;

	display: flex;
	justify-content: space-between;
	align-items: center;

	height: 40px;
	height: var(--option-height);
	width: 100%;

	border-radius: 6px;
	outline: 2px #6600ee solid;

	cursor: pointer;
	user-select: none;

	color: #292929;
	font-family: Roboto-Light;
}

.selected-option {
	margin-left: 15px;
}

.select-input-main-container.hidden {
	outline: 1px #999999 solid;
}

.select-input-main-container.hidden .triangle {
	/* border-top: 6px #6600ee solid; */
	border-bottom: 6px #5f5f5f solid;
	transform: rotate(180deg);
}

.triangle {
	width: 0px;
	height: 0 px;

	margin-right: 9px;
	margin-top: 8px;

	/* border-top: 6px #6600ee solid; */
	border-top: 6px transparent solid;
	border-right: 6px transparent solid;
	border-bottom: 6px #6600ee solid;
	border-left: 6px transparent solid;

	transition-duration: 300ms;

	transform: rotate(0deg) translateY(-6px);
}

.options-container {
	position: absolute;
	top: 42px;
	top: calc(var(--option-height) + 2px);
	left: -1px;

	width: calc(100% + 2px);
	height: var(--height);
	border-radius: 6px;

	transition-duration: var(--time);

	box-shadow: 0px 1px 10px #8b8b8b;
	overflow: hidden;

	z-index: 6;
	background-color: #6600ee;
	background-color: var(--background);
}

.select-input-main-container.hidden .options-container {
	height: 0px;
}

.options-container .select-option {
	display: flex;
	justify-content: left;
	align-items: center;

	width: 100%;
	height: 40px;
	height: var(--option-height);

	transition-duration: var(--time);

	text-indent: 15px;

	overflow: hidden;
}

.options-container .select-option:nth-child(1) {
	margin-top: 1px;
}

.options-container .select-option:nth-last-child(1) {
	border-radius: 0px 0px 6px 6px;
}

.options-container .select-option:hover {
	background-color: #dfdfdf;
}
</style>
