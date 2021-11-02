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
				name: "Clients",
				component: () => import(/* webpackChunkName: "Clients" */ "../views/Clients.vue"),
			},
			{
				path: "providers",
				name: "Providers",
				component: () => import(/* webpackChunkName: "Providers" */ "../views/Providers.vue"),
			},
			{
				path: "products",
				name: "Products",
				component: () => import(/* webpackChunkName: "Products" */ "../views/Products.vue"),
			},
			{
				path: "profile",
				name: "Profile",
				component: () => import(/* webpackChunkName: "Profile" */ "../views/Profile.vue"),
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
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// await store.dispatch("getUserData");
		if (store.state.auth == false) {
			let response = await store.dispatch("getUserData");
			if (response.error) next("/login");
			else next();
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
