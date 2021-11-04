<template>
	<div
		class="text-input-div"
		:class="{ filled, error: errors.length != 0 }"
		:style="{
			'--background': background != null ? background : '#fff',
			'--linecolor': linecolor != null ? linecolor : '#d4d4d4',
			'--color': color != null ? color : '#aaa',
		}"
	>
		<input
			v-model="modelValue.content"
			:type="password != undefined ? 'password' : 'text'"
			:id="placeholder + '-input'"
			@update:modelValue="$emit('update:modelValue', this.modelValue)"
			@focus="this.modelValue.errors = []"
		/>
		<label class="placeholder-label">{{ placeholder }} </label>
		<label class="error-label" v-if="errors.length != 0" :class="{ filled: filled }">{{ errors.slice(-1)[0] }}</label>
	</div>
</template>

<script>
export default {
	props: ["placeholder", "modelValue", "password", "email", "validate", "background", "linecolor", "color"],
	computed: {
		filled() {
			return this.modelValue.content.length != 0;
		},
		errors() {
			let currentContent = this.modelValue.content;

			let inheritErrors = this.modelValue.errors ? this.modelValue.errors : [];
			let ownErrors = [];

			let isPassword = this.password != null;
			let isEmail = this.email != null;
			let checkValid = this.validate != null;

			if (isPassword && currentContent.length != 0 && checkValid) {
				if (currentContent.length < 8 || currentContent.toLowerCase() == currentContent || !/\d/.test(currentContent)) {
					ownErrors.push("Insafety password");
				}
			}

			if (isEmail && currentContent.length != 0 && checkValid) {
				if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentContent)) {
					ownErrors.push("Invalid email");
				}
			}

			this.modelValue.errorCount = [...ownErrors, ...inheritErrors].length;
			return [...ownErrors, ...inheritErrors];
		},
	},
};
</script>

<style scoped>
.text-input-div {
	position: relative;

	width: 80%;
	height: 50px;

	margin-top: 35px;
}

input {
	width: 100%;
	height: 100%;

	border: none;
	outline: var(--linecolor) solid 1px;
	border-radius: 2px;

	font-size: 16px;
	text-indent: 10px;

	transition-duration: 100ms;

	background-color: var(--background);
}

.text-input-div.error input {
	outline: #b00020 solid 2px;
}

.text-input-div:focus-within input {
	outline: #6600ee solid 2px;
}
.text-input-div.filled.error:focus-within input {
	outline: #b00020 solid 2px;
}

.placeholder-label {
	position: absolute;
	top: 16px;
	left: 6px;
	padding: 0px 10px;

	color: var(--color);
	background-color: var(--background);

	transition-duration: 200ms;

	pointer-events: none;
}
.text-input-div.filled .placeholder-label {
	top: -9px;
	color: var(--color);
	font-size: 14px;
}
.text-input-div.error .placeholder-label {
	color: #b00020;
}

.text-input-div:focus-within .placeholder-label {
	top: -9px;
	color: #6600ee;
	font-size: 14px;
}

.text-input-div.filled:focus-within .placeholder-label {
	top: -9px;
	color: #6600ee;
	font-size: 14px;
}
.text-input-div.filled.error:focus-within .placeholder-label {
	color: #b00020;
}

.error-label {
	position: absolute;
	left: 14px;
	top: 102%;
	font-size: 12px;
	color: #bb0020;
	animation: 80ms spawn-error;
}
@keyframes spawn-error {
	0% {
		transform: translateX(0px);
	}
	25% {
		transform: translateX(4px);
	}
	50% {
		transform: translateX(0px);
	}
	75% {
		transform: translateX(-4px);
	}
	100% {
		transform: translateX(0px);
	}
}
</style>
