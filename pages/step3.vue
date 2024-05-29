<template>
	<div class="step3-wrapper">
		<div class="step-copy">
			<h2>Paso 3</h2>
			<p>Llegó la hora de votar</p>
		</div>

		<p>Selecciona la elección que deseas hacer</p>

		<div class="parties mb-3">
			<article class="party" @click="setVote('pan')" :class="{ 'selected': voting.party === 'pan' }">
				<img src="/images/pan.svg" alt="">
				<div class="party-info">
					<h3>PAN</h3>
					<p>Partido Acción Nacional</p>
				</div>
			</article>

			<article class="party" @click="setVote('pri')" :class="{ 'selected': voting.party === 'pri' }">
				<img src="/images/pri.svg" alt="">
				<div class="party-info">
					<h3>PRI</h3>
					<p>Partido Revolucionario Institucional</p>
				</div>
			</article>

			<article class="party" @click="setVote('morena')" :class="{ 'selected': voting.party === 'morena' }">
				<img src="/images/morena.svg" alt="">
				<div class="party-info">
					<h3>Morena</h3>
					<p>Movimiento de Regeneración Nacional</p>
				</div>
			</article>
		</div>

		<template v-if="!!voting.party">
			<p class="text-center text-muted fs-7 mb-1">He seleccionado a mi candidato y quiero emitir mi voto</p>

			<p class="text-center">
				<nuxt-link to="/step3" class="btn rounded-pill btn-start w-100 btn-primary">Emitir Voto</nuxt-link>
			</p>
		</template>
	</div>
</template>

<script setup>
	const voting = useVotingStore();

	const setVote = (party) => {
		voting.party = party;
	};

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.step3-wrapper
		width: 100%

		.step-copy
			text-align: center

			h2
				font-weight: 900
				color: $brand2
				margin-bottom: 0.25rem

		.parties
			display: flex
			flex-direction: column
			width: 100%
			gap: 1rem

			.party
				width: 100%
				border: 1px solid var(--bs-border-color)
				border-radius: 0.5rem
				padding: 0.5rem
				display: flex
				align-items: center
				gap: 1rem
				transition: all 500ms ease

				.party-info
					h3
						font-size: 1.2rem
						font-weight: 900
						margin-bottom: 0

					p
						color: var(--bs-gray-600)
						margin-bottom: 0
						font-size: 0.75rem

				&.selected
					border-color: var(--bs-primary)
					background: var(--bs-gray-200)

				img
					width: 50px
</style>