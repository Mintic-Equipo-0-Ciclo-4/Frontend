<template>
	<div id="main-container">
		<div id="title-div"><h1>Signup</h1></div>

		<div id="inputs-div">
			<TextInput v-model="cedula" placeholder="Cedula"></TextInput>
			<TextInput v-model="nombre" placeholder="Nombre"></TextInput>
			<TextInput v-model="email" placeholder="Email" email validate></TextInput>
			<TextInput v-model="username" placeholder="Username"></TextInput>
			<TextInput v-model="password" placeholder="Password" password validate></TextInput>
		</div>

		<div id="buttons-div">
			<RectButton content="Register" @click="signupCreateUser" main></RectButton>
			<RectButton content="Login" @click="$router.push('login')"></RectButton>
		</div>
	</div>
</template>

<script>
import RectButton from "@/components/RectButton.vue";
import TextInput from "@/components/TextInput.vue";
import { mapActions, mapMutations } from "vuex";

export default {
	data() {
		return {
			cedula: { content: "" },
			nombre: { content: "" },
			email: { content: "" },
			username: { content: "" },
			password: { content: "" },
		};
	},
	components: {
		RectButton,
		TextInput,
	},
	methods: {
		...mapActions(["createUser"]),
		...mapMutations(["spawnNotification"]),
		checkValid(prop) {
			if (this[prop].content.length == 0) {
				this[prop].errors = ["Required field"];
				return false;
			}
			if (this[prop].errorCount) {
				if (this[prop].errorCount != 0) {
					return false;
				} else {
					return true;
				}
			}
			return true;
		},
		async signupCreateUser() {
			if (
				!(
					this.checkValid("cedula") &&
					this.checkValid("nombre") &&
					this.checkValid("email") &&
					this.checkValid("username") &&
					this.checkValid("password")
				)
			)
				return;
			const res = await this.createUser({
				cedula: this.cedula.content,
				nombre: this.nombre.content,
				email: this.email.content,
				username: this.username.content,
				password: this.password.content,
			});
			if (res.error) {
				switch (res.status) {
					case 409: {
						let conflictParam = res.error.conflictParam;
						this[conflictParam].errors = ["Already exist"];
						break;
					}
				}
			} else {
				this.spawnNotification({ text: "Usuario creado exitosamente" });
				this.$router.push("/login");
			}
		},
	},
};
</script>

<style scoped>
#main-container {
	display: grid;
	grid-template-rows: 80px 460px 140px;

	width: 100%;
	max-width: 800px;
	height: 100%;

	background-color: #fff;
}

#title-div {
	display: flex;
	justify-content: left;
	align-items: center;

	background-color: #6600ee;
	color: #fff;
	box-shadow: 0px 4px 6px #c0c0c0;

	text-indent: 15px;
}

#inputs-div {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-content: flex-start;
}

#buttons-div {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

@media screen and (min-width: 800px) {
	#main-container {
		height: 700px;
		width: 600px;

		box-shadow: 0px 0px 15px #c0c0c0;

		/* outline: #6200ee solid 2px; */
	}
}
</style>
