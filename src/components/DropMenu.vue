<template>
	<router-link v-for="item of items" :key="item.id" class="navbar-link" :to="`/${item.route}`">
		<h1>{{ item.name }}</h1>
	</router-link>
</template>

<script>
export default {
	setup() {},
	props: ["items"],
};
</script>
