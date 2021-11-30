<template>
	<div
		class="select-input-main-container"
		@click="hidden = !hidden"
		:class="{ hidden }"
		:style="{
			'--time': '300ms',
			'--background': background,
			'--height': Math.min(options.length, 4) * height + 'px',
			'--option-height': height + 'px',
			'--scroll': options.length <= 4 ? 'hidden' : 'auto',
		}"
	>
		<div class="options-container">
			<div class="select-option" v-for="(option, index) of options" :key="option.key" @click="selection = index">
				<h4>{{ displayOptions[index] }}</h4>
			</div>
		</div>
		<h4 class="selected-option">{{ displayOptions[modelValue] }}</h4>
		<span class="triangle"></span>

		<label class="placeholder" v-if="placeholder">{{ placeholder }}</label>
	</div>
</template>

<script>
export default {
	props: ["modelValue", "options", "background", "height", "placeholder"],
	data() {
		return {
			hidden: true,
			selection: -1,
		};
	},
	computed: {
		displayOptions() {
			if (typeof this.options[0] === "string") return this.options;
			else
				return this.options.map((option) => {
					return option.name;
				});
		},
	},
	watch: {
		selection() {
			this.$emit("update:modelValue", this.selection);
			this.$emit("update");
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
	text-transform: capitalize;
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
	height: 0px;

	margin-right: 9px;
	margin-top: 8px;

	/* border-top: 6px #6600ee solid; */
	border-top: 6px transparent solid;
	border-right: 6px transparent solid;
	border-bottom: 6px #6600ee solid;
	border-left: 6px transparent solid;

	transition-duration: var(--time);

	transform: rotate(0deg) translateY(-6px);
}

.options-container {
	position: absolute;
	top: 42px;
	top: calc(var(--option-height) + 2px);
	left: -1px;

	width: calc(100% + 2px);
	height: calc(var(--height) + 1px);
	max-height: calc(var(--option-height) * 4);
	border-radius: 6px;

	transition-duration: var(--time);

	box-shadow: 0px 1px 10px #8b8b8b;
	overflow-y: hidden;
	overflow-y: var(--scroll);

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
	text-transform: capitalize;

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

.select-input-main-container .placeholder {
	position: absolute;
	left: 10px;
	top: -10px;
	background: var(--background);
	padding: 0px 10px;

	pointer-events: none;
	font-size: 15px;
	color: #6600ee;
}

.select-input-main-container.hidden .placeholder {
	color: #5f5f5f;
}

/**Scrollbar */

.options-container::-webkit-scrollbar {
	background-color: #fff;
	width: 14px;

	border-radius: 6px;
}

.options-container::-webkit-scrollbar-track {
	background-color: #e9e9e9;
	border-radius: 6px;
}

.options-container::-webkit-scrollbar-thumb {
	background-color: #babac0;
	border-radius: 16px;
	border: 5px solid #e9e9e9;
}
.options-container::-webkit-scrollbar-thumb:hover {
	background-color: #a0a0a5;
	border: 4px solid #e9e9e9;
}

.options-container::-webkit-scrollbar-button {
	display: none;
	border-radius: 6px;
}
</style>
