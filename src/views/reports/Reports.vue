<template>
	<div class="reportes-main-container">
		<div class="reportes-view-div">
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
.reportes-main-container {
	width: 100%;
	height: 100%;
	overflow: auto;
}

/**Scrollbar */

.reportes-main-container::-webkit-scrollbar {
	background-color: #fff;
	width: 14px;

	border-radius: 6px;
}

.reportes-main-container::-webkit-scrollbar-track {
	background-color: #e9e9e9;
	border-radius: 6px;
}

.reportes-main-container::-webkit-scrollbar-thumb {
	background-color: #8b8b8b;
	border-radius: 16px;
	border: 5px solid #e9e9e9;
}
.reportes-main-container::-webkit-scrollbar-thumb:hover {
	background-color: #a0a0a5;
	border: 4px solid #e9e9e9;
}

.reportes-main-container::-webkit-scrollbar-button {
	display: none;
	border-radius: 6px;
}
</style>
