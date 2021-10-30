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
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
	},
	{
		path: "/login",
		name: "Login",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
	},
	{
		path: "/signup",
		name: "Signup",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "signup" */ "../views/Signup.vue"),
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
