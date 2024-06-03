<template>
	<div class="start">
		<div class="container">
			<p class="text-center">
				<nuxt-link to="/step1" class="btn btn-start btn-primary">Start process</nuxt-link>
			</p>
			<p class="text-muted text-center">Remember that this information is confidential and will not be shared with anyone.</p>
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