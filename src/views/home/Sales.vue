<template>
	<SelectInput :options="selectOptions"></SelectInput>
</template>

<script>
import SelectInput from "@/components/SelectInput.vue";

export default {
	setup() {},
	data() {
		return {
			selectOptions: ["test", "otro", "mas"],
		};
	},
	components: { SelectInput },
};
</script>
