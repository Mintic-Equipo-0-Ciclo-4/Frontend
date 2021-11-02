import { createStore } from "vuex";

export default createStore({
	state: {
		userData: {},
		auth: false,
	},
	mutations: {
		setUserData(state, payload) {
			state.userData = payload;
		},
		setAuth(state, payload) {
			state.auth = payload;
		},
	},
	actions: {
		async createUser(context, payload) {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (response.ok) {
				return { status: response.status, error: null };
			} else {
				const body = await response.json();
				return { status: response.status, error: body };
			}
		},

		async loginUser(context, payload) {
			const response = await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify(payload),
			});
			if (response.ok) {
				return { status: response.status, error: null };
			} else {
				return { status: response.status, error: response.statusText };
			}
		},

		async getUserData(context, payload) {
			const response = await fetch("/api/auth", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
			});

			if (response.ok) {
				const body = await response.json();
				context.commit("setAuth", true);
				context.commit("setUserData", body);
				return { status: response.status, error: null };
			} else {
				context.commit("setUserData", undefined);
				return { status: response.status, error: response.statusText };
			}
		},

		async closeSession(context, payload) {
			const response = await fetch("/api/auth", {
				method: "DELETE",
				credentials: "same-origin",
			});

			if (response.ok) {
				context.commit("setAuth", false);
				context.commit("setUserData", undefined);
				return { status: response.status, error: null };
			} else {
				console.trace("Error al cerrar sesion");
				return { status: response.status, error: response.statusText };
			}
		},

		async uploadProducts(context, payload) {
			const response = await fetch("/api/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				return { status: response.status, error: null };
			} else {
				return { status: response.status, error: response.statusText };
			}
		},
	},
});
