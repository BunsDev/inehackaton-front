<template>
	<div class="document-upload" v-if="request">
		<h2 class="request-title">{{ request.name }}</h2>
		<p class="request-description">{{ request.description }}</p>

		<p>{{ request.requirements.description }}</p>

		<template v-if="!!request.requirements.files">
			<div class="row justify-content-center">
				<template v-for="f in request.requirements.files">
					<div class="col-12 col-sm-6">
						<div class="file">
							<p class="file-title">{{ f.name }}</p>
							<platform-file-upload
								class="file-upload"
								accept="image/jpeg,image/png,application/pdf"
							>
								<template #default>
									Suelta el documento aquí
								</template>
							</platform-file-upload>
						</div>
					</div>
				</template>
			</div>
		</template>


	</div>
</template>

<script setup>
	const props = defineProps({
		request: {
			type: Object,
			required: true,
		},
	});
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.document-upload
		max-height: 80dvh
		width: 800px
		max-width: 100%

	.request-title
		font-size: 1.6rem
		margin-bottom: 0.125rem

	.request-description
		padding-bottom: 0.5rem
		border-bottom: 1px solid var(--bs-border-color)

	.file
		border: 1px solid var(--bs-border-color)
		border-radius: 0.5rem
		margin-bottom: 1rem

		.file-title
			padding: 0.5rem
			border-bottom: 1px solid var(--bs-border-color)

	.file-upload
		aspect-ratio: 16/9
		display: flex !important
		justify-content: center
		align-items: center
</style>