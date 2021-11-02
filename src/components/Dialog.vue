<template>
	<div class="dialog-background-container" @click="modelValue = !modelValue">
		<div class="dialog-main-container">
			<h1>{{ title }}</h1>
			<p>{{ content }}</p>
			<div class="dialog-button-div">
				<RectButton content="Cancel" text></RectButton>
				<RectButton content="Agree" text></RectButton>
			</div>
		</div>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";

export default {
	props: ["modelValue", "title", "content"],
	components: { RectButton },
	data() {
		return {};
	},
	watch: {
		modelValue() {
			this.$emit("update:modelValue", this.modelValue);
		},
	},
};
</script>

<style scoped>
.dialog-background-container {
	position: absolute;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100vw;
	height: calc(var(--vh, 1vh) * 100);

	top: 0px;
	z-index: 3;

	background-color: #5252529c;

	animation: linear 150ms dialogShowing;
}

.dialog-main-container {
	display: grid;
	grid-template-rows: 50px auto 50px;

	border-radius: 7px;
	box-shadow: 0px 0px 25px #4e4e4e;

	width: 85%;
	height: 60%;
	max-height: 200px;
	max-width: 335px;

	background-color: #fff;
	z-index: 4;
}

.dialog-main-container h1 {
	align-self: center;
	justify-self: left;
	margin-left: 20px;

	font-family: Roboto-Light;
	font-size: 20px;

	color: #303030;
}

.dialog-main-container p {
	margin: 5px 20px;
	justify-self: left;
	align-self: flex-start;
	line-height: 21px;

	text-align: left;
	color: #797979;
}

.dialog-button-div {
	display: flex;
	justify-content: right;
	justify-self: center;
	align-self: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

.dialog-button-div button {
	margin-right: 15px;
	width: max-content;
	padding: 0px 8px;
	height: 38px;

	text-transform: uppercase;
	font-size: 15px;

	font-family: Roboto-Bold;
}

@keyframes dialogShowing {
	from {
		background-color: transparent;
	}
	to {
		background-color: #5252529c;
	}
}
</style>
