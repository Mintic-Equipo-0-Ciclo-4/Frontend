import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
	{
		path: "/",
		alias: "/home",
		name: "Home",
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: "clients",
				alias: "/",
				component: import(/* webpackChunkName: "Clients" */ "../views/Clients.vue"),
			},
			{
				path: "providers",
				alias: "/",
				component: import(/* webpackChunkName: "Providers" */ "../views/Providers.vue"),
			},
		],
		component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
	},
	{
		path: "/signup",
		name: "Signup",
		component: () => import(/* webpackChunkName: "Signup" */ "../views/Signup.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "PageNotFound",
		component: () => import(/* webpackChunkName: "Page Not Found" */ "../views/PageNotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	await store.dispatch("getUserData");
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.state.userData == null) {
			next("/login");
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
