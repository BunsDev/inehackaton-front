<template>
	<div class="step3-wrapper">

		<div class="vote-error" :class="{ 'voted': !!voteError }">
			<icon name="material-symbols:error-rounded" />
			<h4>Lo sentimos, este ciudadano ya está registrado con su voto.</h4>
		</div>

		<div class="voting-wrapper" :class="{ 'voted': !!voted }">
			<div class="step-copy">
				<h2>Paso 3</h2>
				<p>¡Llegó la hora de votar!</p>
			</div>

			<div class="mb-3">
				<p class="mb-1 text-center">Selecciona la elección que deseas hacer:</p>
				<!-- pill tabs for "Estatales" and "Federales" -->
				<div class="d-flex">
					<div class="btn-group flex-grow-1" role="group">
						<button
							class="btn"
							:class="{ 'btn-primary': mode === 'federales', 'btn-outline-primary': mode !== 'federales' }"
							@click="mode = 'federales'"
						>Federales
						</button>
						<button
							class="btn"
							:class="{ 'btn-primary': mode === 'estatales', 'btn-outline-primary': mode !== 'estatales' }"
							@click="mode = 'estatales'"
						>Estatales
						</button>
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
				<p class="text-center text-muted fs-7 mb-1">He seleccionado a mis candidato y quiero emitir mi voto</p>

				<p class="text-center">
					<nuxt-link
						@click="castVote"
						class="btn rounded-pill btn-start w-100 btn-primary"
					>Emitir Voto
					</nuxt-link>
				</p>
			</template>
		</div>

		<div class="already-voted" :class="{ 'voted': !!voted }">
			<div class="selfie mb-2">
				<img :src="voting.selfie" alt="">
			</div>

			<div class="copy text-center">
				<h3>¡Estás haciendo historia!</h3>
				<p class="text-muted">Tu voto está siendo procesado</p>
				<loader-quantum />
			</div>
		</div>
	</div>
</template>

<script setup>
	const voting = useVotingStore();
	const router = useRouter();
	const voted = ref(false);
	const voteError = ref(false);

	const mode = ref('federales');

	const setVote = (party, type) => {
		if(type === 'federales') {
			voting.setFederalParty(party);
		} else {
			voting.setStateParty(party);
		}
	};

	const castVote = async () => {

		voted.value = true;

		// wait 5 seconds
		await new Promise(resolve => setTimeout(resolve, 5000));
		const voteRes = await voting.castVote();

		if(!!voteRes) {
			await router.push('/thanks');
		} else {

			voteError.value = true;
		}
	};

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.vote-error

		max-width: 400px
		width: 80%
		left: 50%
		top: 50%
		transform: translate(-50%, -50%)
		background: white
		border: 1px solid var(--bs-danger)
		height: 50dvh
		z-index: 100
		border-radius: 0.5rem
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		text-align: center
		padding: 2rem
		opacity: 0
		transition: all 500ms ease
		pointer-events: none

		&.voted
			opacity: 1
			pointer-events: all

		.icon
			font-size: 100px
			color: var(--bs-danger)

	.already-voted
		opacity: 0
		transition: all 500ms ease
		pointer-events: none
		overflow: clip
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		padding: 1rem
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center

		&.voted
			opacity: 1
			pointer-events: all

			.selfie
				margin-top: 0

		.selfie
			width: 150px
			aspect-ratio: 1
			border: 2px solid var(--bs-primary)
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
			border-radius: 50%
			overflow: clip
			transition: all 500ms ease
			margin: 180px auto

			img
				object-fit: cover
				width: 100%
				aspect-ratio: 1

	.voting-wrapper
		transition: all 500ms ease
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		padding: 1rem

		&.voted
			opacity: 0
			pointer-events: none

	.step3-wrapper
		width: 100%
		position: absolute
		height: 100%
		top: 0
		left: 0

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