<template>
	<div class="step2-wrapper">

		<div class="file-uploader-wrapper" v-if="!voting.selfie || !voting.faceSimilarity || !voting.faceRecognition">

			<img class="face-scan-animation" src="/images/face-scan.gif" alt="" :class="{ active: uploadLoading }">

			<div class="step-copy">
				<h2>Step 2</h2>
				<p>Take a selfie</p>
			</div>

			<platform-file-upload
				ref="fileUploadRef"
				class="file-upload mb-4"
				@update="uploadIne"
				capture="user"
				:multiple="false"
				accept="image/jpeg,image/png"
			>
				<template #default>
					<div class="face-rec">
						<icon name="material-symbols:android-camera-outline" />
						<p class="text-muted fs-7">
							Please take a selfie here.
						</p>
					</div>
				</template>
				<template #overlay>
					<div class="drop-disclaimer">
						<icon name="teenyicons:cup-outline" />
						<p>Release the file of your ine as if they were very hot!</p>
					</div>
				</template>
			</platform-file-upload>

			<p class="text-center suggestions">
				<a class="btn btn-suggestions btn-outline-primary w-100 rounded-pill">
					<icon name="material-symbols:live-help-outline" />
					Suggestions for the best loading</a>
			</p>
		</div>

		<div class="selfie-uploaded" v-else>

			<template v-if="voting.faceSimilarity.similarity < 85">
				<div class="selfie">
					<img :src="voting.selfie" alt="">
				</div>

				<div class="error-copy text-center">
					<h4>There is a problem with your photograph</h4>
					<p>It looks like we were unable to identify your photo against your voter ID. Please try again.</p>
				</div>

				<p class="text-center">
					<a
						href="#"
						@click.prevent="retry"
						class="btn rounded-pill btn-start w-100 btn-primary"
					>Try again</a>
				</p>
			</template>

			<template v-else>
				<div class="selfie">
					<img :src="voting.selfie" alt="">
				</div>
				<div class="success-copy text-center">

					<h4>Identity confirmed</h4>
					<p>Thank you! Ready to vote</p>
				</div>
				<p class="text-center">
					<nuxt-link to="/step3" class="btn rounded-pill btn-start w-100 btn-primary">Let's vote!</nuxt-link>
				</p>

				<p class="text-center flex">
					Chainlink Identity validation transaction:
					<code>
						<a
							:href="voting.faceSimilarity.tx"
							target="_blank"
							rel="noopener noreferrer"
						>{{ voting.faceSimilarity.tx }}</a>
					</code>
					<img src="https://cryptologos.cc/logos/chainlink-link-logo.png" alt="Chainlink logo"
						style="width: 20px; height: 20px; margin-left: 0.5rem;"
					/>
				</p>

			</template>
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
				voting.selfie = data.value.data;

				const faceRecognitionRes = await useBaseFetch('/attachments/recognition', {
					method: 'POST',
					body: JSON.stringify({
						url1: voting.ineFront,
						url2: voting.selfie,
					}),
				});

				if(faceRecognitionRes.data.value) {
					voting.faceSimilarity = faceRecognitionRes.data.value.data;
					voting.faceRecognition = true;
				}
			}
		}

		uploadLoading.value = false;
		fileUploadRef.value.resetFiles();
	};

	const retry = () => {
		voting.selfie = null;
		voting.faceRecognition = false;
	};
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.face-scan-animation
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		max-width: 80%
		z-index: 100
		opacity: 0
		pointer-events: none
		transition: all 250ms ease-in-out

		&.active
			opacity: 1
			pointer-events: all

	.selfie-uploaded
		width: 100%

		.selfie
			text-align: center
			margin-bottom: 1rem

			img
				width: 150px
				aspect-ratio: 1
				border-radius: 50%
				object-fit: cover
				border: 2px solid white
				box-shadow: 0 0 10px rgba(black, 0.5)

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