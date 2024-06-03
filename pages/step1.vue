<template>
	<div class="step1-wrapper">

		<div class="container">
			<div class="file-uploader-wrapper" v-if="!voting.ineBack || !voting.ineFront">

				<platform-loading :active="uploadLoading" :is-full-page="false" />

				<div class="step-copy">
					<h2>Step 1</h2>
					<p>Upload your voter's credential here.</p>
					<p>Please upload: one image of the front and one of the back of your credential or, failing that, an image containing both sides.</p>
				</div>

				<platform-file-upload
					ref="fileUploadRef"
					class="file-upload mb-2"
					@update="uploadIne"
					:multiple="false"
					capture="user"
					accept="image/jpeg,image/png"
				>
					<template #default>
						<div class="face-rec">
							<icon name="carbon:credentials" />
							<p class="text-muted fs-7">
								Please upload your voter identification card here.
							</p>
						</div>
					</template>
					<template #overlay>
						<div class="drop-disclaimer">
							<icon name="teenyicons:cup-outline" />
							<p>Release your INE file as if they were really hot!</p>
						</div>
					</template>
				</platform-file-upload>

				<div class="row gx-2">
					<div class="col-6">
						<div class="side-verification side-front" :class="{ 'ready': !!voting.ineFront }">
							<icon v-if="voting.ineFront" name="material-symbols:check-small-rounded" />
							<icon
								v-else
								name="streamline:interface-page-controller-loading-1-progress-loading-load-wait-waiting"
							/>
							Front
						</div>
					</div>
					<div class="col-6">
						<div class="side-verification side-back" :class="{ 'ready': !!voting.ineBack }">
							<icon v-if="voting.ineBack" name="material-symbols:check-small-rounded" />
							<icon
								v-else
								name="streamline:interface-page-controller-loading-1-progress-loading-load-wait-waiting"
							/>
							Back
						</div>
					</div>
				</div>

				<p class="text-center suggestions">
					<a class="btn btn-suggestions btn-outline-primary w-100 rounded-pill">
						<icon name="material-symbols:live-help-outline" />
						Suggestions for the best loading</a>
				</p>
			</div>

			<div class="ine-uploaded" v-else>

				<div class="ine">
					<img :src="voting.ineFront" alt="INE" />
				</div>

				<p class="text-center mb-1">Done, your INE has been successfully uploaded.</p>
				<p class="text-center"><code>{{ voting.idMex }}</code></p>
				<p class="text-center flex">
					Chainlink Identity validation transaction:
					<code>
						<a
							:href="voting.idMexTx"
							target="_blank"
							rel="noopener noreferrer"
						>{{ voting.idMexTx }}</a>
					</code>
					<img src="https://cryptologos.cc/logos/chainlink-link-logo.png" alt="Chainlink logo"
						style="width: 20px; height: 20px; margin-left: 0.5rem;"
					/>
				</p>

				<p class="text-center">
					<nuxt-link
						to="/step2"
						class="btn rounded-pill btn-start w-100 btn-primary"
					>Next Step
					</nuxt-link>
				</p>
			</div>
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
			});

			if(data) {

				const credentialPhotoRes = await useBaseFetch('/attachments/analyze', {
					method: 'POST',
					body: JSON.stringify({ url: data.value.data }),
				});

				if(credentialPhotoRes.data.value) {

					// check it includes ine_front
					if(credentialPhotoRes.data.value.data.documentType.includes('ine_front')) {

						const credentialPhotoRes = await useBaseFetch('/attachments/credential-photo', {
							method: 'POST',
							body: JSON.stringify({ url: data.value.data }),
						});

						voting.photo = credentialPhotoRes.data.value.data;
						voting.ineFront = data.value.data;
					}

					if(credentialPhotoRes.data.value.data.documentType.includes('ine_back')) {

						// perform the ocr to find the idmex
						const ocrRes = await useBaseFetch('/attachments/ocr', {
							method: 'POST',
							body: JSON.stringify({ url: data.value.data }),
						});

						console.log('ocrRes', ocrRes.data.value.data);
						voting.idMexTx = ocrRes.data.value.data.tx
						voting.idMex = ocrRes.data.value.data.idMex
						voting.ineBack = data.value.data;
					}

					console.log('credentialPhotoRes', credentialPhotoRes.data.value.data.documentType);
				}
			}
		}

		uploadLoading.value = false;
		fileUploadRef.value.resetFiles();
	};
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.side-verification
		border: 1px solid var(--bs-border-color)
		padding: 0.5rem
		text-align: center
		margin-bottom: 1rem

		&.ready
			background: var(--bs-success)
			color: white

		&.side-front
			border-radius: 0 0 0 0.5rem

		&.side-back
			border-radius: 0 0 0.5rem 0

		.icon
			font-size: 1rem

	.ine-uploaded
		width: 100%
		max-width: 500px
		margin: 0 auto

		.ine
			aspect-ratio: 16/9
			background: var(--bs-gray-300)
			border-radius: 1rem
			margin-bottom: 1rem
			padding: 1rem

			img
				width: 100%
				aspect-ratio: 16/9
				object-fit: contain

	.btn-suggestions
		border-color: var(--bs-border-color)
		color: var(--bs-gray-600)

		&:hover,
		&:focus,
		&:active
			background: transparent
			color: var(--bs-primary)
			border: 1px solid var(--bs-primary)

	.step1-wrapper
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
		max-width: 500px
		margin: 0 auto

		.file-upload
			display: flex !important
			justify-content: center
			align-items: center
			border-radius: 1rem 1rem 0 0
			overflow: hidden
			height: 200px

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
			text-align: center
			padding: 1rem

			.icon
				width: 50px
				height: 50px

		:deep(.drop-zone)
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			gap: 1rem
			padding: 1rem
			border-radius: 1rem 1rem 0 0
			border: 2px dashed var(--bs-border-color)
			width: 100%
			height: 100%
			transition: background .3s ease-in-out

		.face-rec
			text-align: center
			margin: 0 auto

			.icon
				width: 50px
				height: 50px
				color: $brand1

			h2
				font-size: 1.5rem
				color: $brand1
</style>