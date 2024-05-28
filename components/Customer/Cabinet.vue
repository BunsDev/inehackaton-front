<template>
	<div class="cabinet">
		<h1 class="welcome">Hola {{ user.nicename }}</h1>

		<template v-if="expedients.length">
			<p>A continuación la lista de expedientes que tienes dentro de CertifAI:</p>

			<article class="expedient" v-for="e in expedients">
				<nuxt-link class="expedient-link" :to="`/dashboard/expedients/${ e.uid }`" />
				<icon name="material-symbols:fiber-new-outline-rounded" />

				<div class="expedient-info">
					<h2 class="expedient-title">{{ e.name }}</h2>
					<time class="expedient-date">Creado el {{ prettyDate(e.created) }}</time>
				</div>

				<div class="expedient-requests">
					<span class="requests-pending">{{ e.requests.filter(r => r.idDocument !== null).length }}</span>
					de
					<span class="requests-total">{{ e.requests.length }}</span>
					documents
				</div>
			</article>
		</template>
		<template v-else>
			<p>En este momento no tienes ningún expediente.</p>
		</template>

	</div>
</template>

<script setup>

	const user = useAuthUser();
	const expedients = ref([]);
	const { prettyDate } = useUtils();

	const getExpedients = async () => {
		const { data } = await useBaseFetch('/users/me/expedients');

		expedients.value = data.value.data;
	};

	onMounted(() => {
		getExpedients();
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	.cabinet
		padding: 1rem

		.welcome
			font-size: 1.5rem

		.expedient
			padding: 1rem
			border-radius: 0.5rem
			margin-bottom: 1rem
			border: 1px solid var(--bs-border-color)
			transition: all 0.3s ease
			display: flex
			align-items: center
			gap: 1rem

			.icon
				color: var(--bs-dark-bg-subtle)
				width: 60px
				height: 60px

			&:hover
				background: var(--bs-light)

			.expedient-link
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
				z-index: 1

			.expedient-info
				.expedient-title
					font-size: 1rem
					margin-bottom: 0

				.expedient-date
					font-size: 0.75rem

			.expedient-requests
				background: var(--bs-success)
				color: white
				padding: 0.5rem
				font-size: 0.75rem
				border-radius: 0.25rem
				margin-left: auto

</style>