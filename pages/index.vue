<template>
	<div class="start">
		<div class="container">
			<p class="text-center">
				<nuxt-link to="/step1" class="btn btn-start btn-primary">Iniciar proceso</nuxt-link>
			</p>
			<p class="text-muted text-center">Recuerda que esta información es confidencial y no será compartida con nadie.</p>
		</div>
	</div>
</template>

<script setup>
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.btn-start
		padding: 1rem
		font-family: 'Roboto Slab', serif
		width: 100%

		@media (min-width: $sm)
			width: auto
</style>