<template>
	<div class="notification" :class="{ showing: modelValue, error: error }">
		<p>{{ text }}</p>
		<RectButton content="ok" class="ok-button" @click="$store.commit('despawnNotification')" text></RectButton>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";

export default {
	props: ["active", "text", "error", "modelValue"],
	data() {
		return {};
	},
	watch: {
		modelValue() {
			this.$emit("update:modelValue", this.modelValue);
		},
	},

	components: { RectButton },
};
</script>

<style scoped>
.notification {
	display: grid;
	grid-template-columns: auto 60px;

	position: absolute;
	left: 0px;
	bottom: -60px;

	height: 60px;
	width: 100%;

	background-color: #323232;
	color: white;
	z-index: 1;

	transition-duration: 0.3s;
}

/*TODO: Encontrar una mejor manera de identificar los errores*/
.notification.error {
	background-color: #290a0a;
}

.notification.showing {
	bottom: 0px;
}

.notification p {
	justify-self: left;
	align-self: center;

	margin-left: 10px;

	font-size: 16px;
	font-family: Roboto-Light;
}

.ok-button {
	justify-self: center;
	align-self: center;

	color: #71aaff;
	font-size: 16px;

	text-transform: uppercase;
	font-family: Roboto;
}

@media screen and (min-width: 800px) {
	.notification {
		left: 25px;
		bottom: -60px;

		width: max-content;
		min-width: 500px;

		border-radius: 4px;

		box-shadow: 0px 0px 10px #616161;
	}

	.notification.showing {
		bottom: 25px;
	}
}
</style>
