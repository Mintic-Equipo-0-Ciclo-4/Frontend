<template>
	<div id="main-container">
		<div id="title-div"><h1>Login</h1></div>

		<div id="inputs-div">
			<TextInput v-model="username" placeholder="Username"></TextInput>
			<TextInput v-model="password" placeholder="Password" @keydown.enter="loginAuthUser" password></TextInput>
		</div>

		<div id="buttons-div">
			<RectButton content="Login" @click="loginAuthUser" main></RectButton>
			<RectButton content="Register" @click="$router.push('signup')"></RectButton>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import RectButton from "@/components/RectButton.vue";
import TextInput from "@/components/TextInput.vue";

export default {
	data() {
		return {
			username: { content: "" },
			password: { content: "" },
		};
	},
	components: {
		RectButton,
		TextInput,
	},
	methods: {
		...mapActions(["loginUser", "getUserData"]),
		async loginAuthUser() {
			if (!(this.checkValid("username") && this.checkValid("password"))) return;

			const res = await this.loginUser({ username: this.username.content, password: this.password.content });
			if (res.error) {
				switch (res.status) {
					case 404: {
						this.username.errors = ["User not found"];
						break;
					}
					case 403: {
						this.password.errors = ["Incorrect password"];
						break;
					}
				}
			} else {
				const log = await this.getUserData();
				this.$router.push("/");
			}
		},
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
	},
};
</script>

<style scoped>
#main-container {
	display: grid;
	grid-template-rows: 80px 220px 140px;

	width: 100%;
	max-width: 800px;
	height: 100%;

	background-color: #fff;
	box-shadow: 5px 5px 5px #bdbdbd;
}

#title-div {
	display: flex;
	justify-content: left;
	align-items: center;

	background-color: #6200ee;
	color: #fff;

	text-indent: 15px;
	font-family: Roboto-Bold;
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
		height: 500px;
		width: 600px;

		box-shadow: 0px 4px 6px #c0c0c0;

		/* outline: #6200ee solid 2px; */
	}
}
</style>
