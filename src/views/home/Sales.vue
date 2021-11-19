<template>
	<SelectInput :options="selectOptions" v-model="value"></SelectInput>
	<h1>{{ value }}</h1>
</template>

<script>
import SelectInput from "@/components/SelectInput.vue";

export default {
	setup() {},
	data() {
		return {
			selectOptions: ["test", "otro", "mas"],
			value: "test",
		};
	},
	components: { SelectInput },
};
</script>
