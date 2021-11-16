<template>
	<div class="float-form-main-container" @click="test">
		<div class="inputs-container">
			<h1 class="title">{{ title }}</h1>
			<div class="inputs-div">
				<TextInput
					v-for="input of modelValue"
					v-model="input.model"
					:key="input.key"
					:placeholder="input.name"
					@update:modelValue="$emit('update:modelValue', modelValue)"
					background="#e9e9e9"
					linecolor="#999999"
					color="#666666"
				></TextInput>
			</div>
			<div class="buttons-div">
				<RectButton class="send-button" content="Send" @click="$emit('close-form')" main></RectButton>
			</div>
		</div>
	</div>
</template>

<script>
import TextInput from "@/components/TextInput.vue";
import RectButton from "@/components/RectButton.vue";

export default {
	props: ["modelValue", "title", "show"],
	components: { TextInput, RectButton },
};
</script>

<style scoped>
.float-form-main-container {
	position: fixed;
	left: 0px;
	top: 0px;

	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;

	background-color: #33333366;

	z-index: 2;
}

.float-form-main-container .inputs-container {
	position: relative;

	display: grid;
	grid-template-rows: 60px auto 80px;

	box-shadow: 0px 0px 25px #4b4b4b;
	background-color: #e9e9e9;

	width: 100%;
	max-width: 600px;

	height: 100%;
	max-height: 600px;

	border-radius: 6px;
	overflow-y: auto;

	/* animation: 0.5s ease-in-out spawnForm; */
}

.float-form-main-container .title {
	width: 80%;

	text-align: left;
	justify-self: center;
	align-self: flex-end;

	font-family: Nunito-Light;
	font-size: 26px;

	color: #4b4b4b;
}

.float-form-main-container .inputs-div {
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: center;

	overflow-y: auto;
	padding-bottom: 10px;
}

.float-form-main-container .buttons-div {
	display: flex;
	align-items: center;
	justify-content: center;
}

/* @keyframes spawnForm {
	from {
		top: -100%;
	}
	to {
		top: 0px;
	}
} */
</style>
