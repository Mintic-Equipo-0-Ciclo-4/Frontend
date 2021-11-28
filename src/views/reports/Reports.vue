<template>
	<div class="reportes-main-container">
		<!-- <div class="reportes-header">
			<router-link to="/reports/products" class="router-link">Products</router-link>
			<router-link to="/reports/clients" class="router-link">Clients</router-link>
			<router-link to="/reports/sales" class="router-link">Sales</router-link>
		</div>
		<div class="reportes-body">
			<router-view></router-view>
		</div> -->
		<h1>Hola</h1>
	</div>
</template>

<style scoped>
.reportes-main-container {
	width: 100%;
	height: 100%;
}

.reportes-header {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	width: 100%;
	height: 70px;

	background-color: #6000dd;
}

.reportes-header .router-link {
	color: #fff;
	align-self: flex-end;
	justify-self: center;

	text-decoration: none;
	font-size: 22px;

	font-family: Nunito;
	width: 100%;
	height: 100%;
}

.reportes-header .router-link.router-link-active {
	background: linear-gradient(360deg, #9645ff, transparent);
}
</style>
