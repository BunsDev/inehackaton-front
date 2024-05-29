<template>
	<div class="step3-wrapper">
		<div class="step-copy">
			<h2>Paso 3</h2>
			<p>¡Llegó la hora de votar!</p>
		</div>

		<div class="mb-3">
			<p class="mb-1 text-center">Selecciona la elección que deseas hacer:</p>
			<!-- pill tabs for "Estatales" and "Federales" -->
			<div class="d-flex">
				<div class="btn-group flex-grow-1" role="group" aria-label="Basic radio toggle button group">
					<input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
					<label class="btn btn-outline-primary" @click="mode = 'federales'" for="btnradio2">Federales</label>
					<input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
					<label class="btn btn-outline-primary" @click="mode = 'estatales'" for="btnradio1">Estatales</label>
				</div>
			</div>
		</div>

		<div class="parties mb-3">
			<template v-if="mode === 'federales'">
				<article
					v-for="c in voting.candidates.federales"
					class="party"
					@click="setVote(c.slug, 'federales')"
					:class="{ 'selected': voting.federalVote === c.slug }"
				>
					<img :src="`/images/${ c.partyImage }`" alt="">
					<div class="party-info">
						<h3>{{ c.party }}</h3>
						<h4>{{ c.candidate }}</h4>
						<p>{{ c.partyName }}</p>
					</div>
				</article>
			</template>

			<template v-if="mode === 'estatales'">
				<article
					v-for="c in voting.candidates.estatales"
					class="party"
					@click="setVote(c.slug, 'estatales')"
					:class="{ 'selected': voting.stateVote === c.slug }"
				>
					<img :src="`/images/${ c.partyImage }`" alt="">
					<div class="party-info">
						<h3>{{ c.party }}</h3>
						<h4>{{ c.candidate }}</h4>
						<p>{{ c.partyName }}</p>
					</div>
				</article>
			</template>
		</div>

		<template v-if="!!voting.federalVote && !!voting.stateVote">
			<p class="text-center text-muted fs-7 mb-1">He seleccionado a mi candidato y quiero emitir mi voto</p>

			<p class="text-center">
				<nuxt-link
					@click="castVote()"
					class="btn rounded-pill btn-start w-100 btn-primary"
				>Emitir Voto
				</nuxt-link>
			</p>
		</template>
	</div>
</template>

<script setup>
	const voting = useVotingStore();
	const router = useRouter();

	const mode = ref('federales');

	const setVote = (party, type) => {
		if(type === 'federales') {
			voting.setFederalParty(party);
		} else {
			voting.setStateParty(party);
		}
	};

	const castVote = async () => {
		await voting.castVote();
		await router.push('/thanks');
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

					h4
						font-size: 1rem
						font-weight: 700
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