<template>
	<div class="step2-wrapper">

		<div class="file-uploader-wrapper" v-if="!voting.ine && true">

			<div class="step-copy">
				<h2>Paso 2</h2>
				<p>Tómate una selfie</p>
			</div>

			<platform-file-upload
				ref="fileUploadRef"
				class="file-upload mb-4"
				@update="uploadIne"
				:multiple="false"
				accept="image/jpeg,image/png"
			>
				<template #default>
					<div class="face-rec">
						<icon name="material-symbols:android-camera-outline" />
						<p class="text-muted fs-7">
							Por favor, tómate una selfie aquí.
						</p>
					</div>
				</template>
				<template #overlay>
					<div class="drop-disclaimer">
						<icon name="teenyicons:cup-outline" />
						<p>Suélta el archivo de tu ine como si estuvieran bien caliente!</p>
					</div>
				</template>
			</platform-file-upload>

			<p class="text-center suggestions">
				<a class="btn btn-suggestions btn-outline-primary w-100 rounded-pill">
					<icon name="material-symbols:live-help-outline" />
					Sugerencias para la mejor carga</a>
			</p>
		</div>

		<div class="ine-uploaded" v-else>

			<div class="ine">

			</div>

			<p class="text-center">Listo, tu INE ha sido cargada exitosamente</p>
			<p class="text-center">
				<nuxt-link to="/step2" class="btn rounded-pill btn-start w-100 btn-primary">Siguiente paso</nuxt-link>
			</p>
		</div>

	</div>
</template>

<script setup>
	const voting = useVotingStore();
	const uploadLoading = ref(false);
	const fileUploadRef = ref(null);

	const uploadIne = async (files) => {

		uploadLoading.value = true;

		if(files.length) {

			// analyze the first and only file
			const file = files[0];

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

			if(data) {
				voting.ine = data.value.data.attachment;

				const credentialPhoto = await useBaseFetch('/attachments/credential-photo', {
					method: 'POST',
					body: JSON.stringify(data.value.data.attachment),
				});

				if(credentialPhoto.data.value) {
					voting.photo.value = credentialPhoto.data.value.data.attachment;
				}
			}
		}

		uploadLoading.value = false;
		fileUploadRef.value.resetFiles();
	};
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.ine-uploaded
		width: 100%

		.ine
			aspect-ratio: 16/9
			background: var(--bs-gray-300)
			border-radius: 1rem
			margin-bottom: 1rem

	.btn-suggestions
		border-color: var(--bs-border-color)
		color: var(--bs-gray-600)

		&:hover,
		&:focus,
		&:active
			background: transparent
			color: var(--bs-primary)
			border: 1px solid var(--bs-primary)

	.step2-wrapper
		width: 100%
		display: flex
		flex-direction: column
		align-items: center
		justify-content: center

		.step-copy
			text-align: center

			h2
				font-weight: 900
				color: $brand2
				margin-bottom: 0.25rem

	.file-uploader-wrapper
		width: 100%

		.file-upload
			aspect-ratio: 1.2
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

		.face-rec
			text-align: center
			margin: 0 auto

			.icon
				width: 100px
				height: 100px
				color: $brand1

			h2
				font-size: 1.5rem
				color: $brand1
</style>