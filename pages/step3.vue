<template>
	<div class="step3-wrapper">
		<div class="step-copy">
			<h2>Paso 3</h2>
			<p>Llegó la hora de votar</p>
		</div>

		<div class="parties">
			<article class="party">
				<img src="/images/pan.svg" alt="">
			</article>

			<article class="party">
				<img src="/images/pri.svg" alt="">
			</article>

			<article class="party">
				<img src="/images/morena.svg" alt="">
			</article>
		</div>
	</div>
</template>

<script setup>
	const voting = useVotingStore();

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.step3-wrapper
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

				img
					width: 100px
</style>