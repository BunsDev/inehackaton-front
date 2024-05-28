<template>
	<div class="document-upload">
		<h1 class="title">
			<icon name="material-symbols:eye-tracking" />
			Omni-Upload
		</h1>

		<div class="uploader-wrapper mb-3">
			<platform-loading :active="uploadLoading" :is-full-page="false" />

			<platform-file-upload
				ref="fileUploadRef"
				class="file-upload"
				@update="uploadAttachments"
				:multiple="true"
				accept="image/jpeg,image/png,application/pdf"
			>
				<template #default>
					<div class="omni-disclaimer">
						<icon name="material-symbols:eye-tracking" />
						<h2>Omni-Upload by Muttuo</h2>
						<p class="text-muted fs-7">Por favor, carga cualquier documento que creas importante para tu expediente, y nuestro avanzado
							<strong>Sistema CertifAI</strong> lo ordenará automáticamente en su ubicación correspondiente.
						</p>
					</div>
				</template>
				<template #overlay>
					<div class="drop-disclaimer">
						<icon name="teenyicons:cup-outline" />
						<p>Suélta los archivos como si estuvieran bien calientes!</p>
					</div>
				</template>
			</platform-file-upload>
		</div>
		<div class="attachments">
			<div v-if="attachments.length">
				<article class="attachment mb-2" v-for="attachment in attachments" :key="attachment.id">
					<div class="attachment-image">
						<img :src="attachment.metas.location" :alt="attachment.name">
					</div>
					<div class="attachment-info">
						<p class="mb-0"><strong>{{ attachment.name }}</strong></p>
						<p class="fs-7 mb-0">{{ attachment.mime }}</p>
					</div>

					<div class="attachment-loading ms-auto" v-if="!attachment.analysis">
						<loader-quantum :size="30" />
						<p>Análisis en<br></br>proceso</p>
					</div>
					<div v-else class="attachment-analysis">
						<p><strong>Tipo de documento:</strong> {{ attachment.analysis.documentType }}</p>
						<p class="mb-0"><strong>Razonamiento:</strong> {{ attachment.analysis.reasoning }}</p>
					</div>
				</article>
			</div>
		</div>
	</div>
</template>

<script setup>
	const attachments = ref([]);
	const uploadLoading = ref(false);
	const fileUploadRef = ref(null);

	const uploadAttachments = async (files) => {

		uploadLoading.value = true;

		if(files.length) {
			for(const file of files) {
				// Create new form data
				const formData = new FormData();
				formData.append('file', file);
				// Call upload api endpoint
				const { data, error } = await useBaseFetch('/upload', {
					method: 'POST',
					body: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});

				attachments.value.push(data.value.data.attachment);

				// get the last attachment
				const attachment = attachments.value[attachments.value.length - 1];

				// analyze attachment
				await analyzeAttachment(attachment);
			}
		}

		uploadLoading.value = false;
		fileUploadRef.value.resetFiles();
	};

	const analyzeAttachment = async (attachment) => {
		const { data, error } = await useBaseFetch(`/attachments/${attachment.id}/analyze`, {
			method: 'POST',
		});

		if(data) {
			attachment.analysis = data.value.data;
		}
	};

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.attachment
		display: flex
		align-items: center
		border-radius: 0.5rem
		overflow: hidden
		background: var(--bs-light)
		padding: 0.5rem
		gap: 1rem

		.attachment-image
			width: 100px
			height: 100px
			overflow: hidden

			img
				width: 100%
				height: 100%
				object-fit: contain

		.attachment-analysis
			margin-left: auto
			width: calc(100% - 350px - 1rem)
			font-size: 0.8rem

		.attachment-loading
			background: white
			border-radius: 0.5rem
			padding: 1rem
			text-align: center
			display: flex
			flex-direction: column
			align-items: center
			gap: 0.5rem

			p
				font-size: 0.75rem
				line-height: 1
				margin-bottom: 0
				color: var(--bs-gray-500)

	.document-upload
		height: 90dvh
		width: 800px
		max-width: 100%

		.title
			font-size: 1.2rem

		.file-upload
			aspect-ratio: 16/5
			display: flex !important
			justify-content: center
			align-items: center
			border-radius: 1rem
			overflow: hidden

		:deep(.file-overlay)
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: rgba(black, 0.5)
			display: flex
			align-items: center
			justify-content: center
			color: white
			transition: all 0.3s ease-in-out

		.drop-disclaimer
			display: flex
			flex-direction: column
			align-items: center
			gap: 1rem
			pointer-events: none

			.icon
				width: 100px
				height: 100px

		:deep(.drop-zone)
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			gap: 1rem
			padding: 1rem
			border-radius: 1rem
			border: 2px dashed var(--bs-border-color)
			width: 100%
			height: 100%
			transition: background .3s ease-in-out

	.omni-disclaimer
		text-align: center
		margin: 0 auto
		max-width: 400px

		.icon
			width: 100px
			height: 100px
			color: $brand1

		h2
			font-size: 1.5rem
			color: $brand1
</style>