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
				component: () => import(/* webpackChunkName: "Clients" */ "../views/home/Clients.vue"),
			},
			{
				path: "providers",
				name: "Providers",
				component: () => import(/* webpackChunkName: "Providers" */ "../views/home/Providers.vue"),
			},
			{
				path: "products",
				name: "Products",
				component: () => import(/* webpackChunkName: "Products" */ "../views/home/Products.vue"),
			},
			{
				path: "sales",
				name: "Sales",
				component: () => import(/* webpackChunkName: "Sales" */ "../views/home/Sales.vue"),
			},
			{
				path: "reports",
				name: "Reports",
				component: () => import(/* webpackChunkName: "Reports" */ "../views/reports/Reports.vue"),
			},
			{
				path: "profile",
				name: "Profile",
				component: () => import(/* webpackChunkName: "Profile" */ "../views/home/Profile.vue"),
			},
		],
		component: () => import(/* webpackChunkName: "Home" */ "../views/home/Home.vue"),
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
