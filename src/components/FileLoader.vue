<template>
	<div
		class="file-loader-container"
		@drop="ondrop"
		@dragover="allowDrop"
		@dragleave="dragOver = false"
		@mouseout="dragOver = false"
		:class="{ active: dragOver }"
	>
		<img src="@/assets/img/upload.svg" alt="" />
		<p>
			Drag and drop here <br />
			or <br />
			<input type="file" id="file" @change="onloadFile" hidden />
			<label class="file-loader-link" for="file">browse</label>
		</p>
	</div>
</template>

<script>
export default {
	props: ["modelValue"],
	data() {
		return {
			dragOver: false,
			files: [],
		};
	},
	methods: {
		ondrop(ev) {
			this.files = [];
			ev.preventDefault();
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
				if (ev.dataTransfer.items[i].kind === "file") {
					let file = ev.dataTransfer.items[i].getAsFile();
					if (file.type !== "application/vnd.ms-excel") return;
					this.files.push(file);
				}
			}
			this.$emit("update:modelValue", this.files);
		},
		onloadFile(ev) {
			this.files = [];
			let loadedFiles = ev.target.files;
			for (let file of loadedFiles) {
				if (file.type !== "application/vnd.ms-excel") return;
				this.files.push(file);
			}
			this.$emit("update:modelValue", this.files);
		},
		allowDrop(ev) {
			this.dragOver = true;
			ev.preventDefault();
		},
	},
};
</script>

<style scoped>
.file-loader-container {
	display: grid;
	grid-template-rows: 50% 50%;

	width: 90%;
	max-width: 500px;

	height: 210px;

	border: dashed #afafaf 2px;
	border-radius: 6px;

	transition-duration: 100ms;
}
.file-loader-container.active {
	border-color: #304ffc;
	border-spacing: 20px;
	stroke-dashoffset: 50px;
}

.file-loader-link {
	text-decoration: underline;
	color: #304ffc;

	cursor: pointer;
}

.file-loader-container img {
	justify-self: center;
	align-self: flex-end;
	margin-bottom: 5px;

	height: 70px;
}
</style>
