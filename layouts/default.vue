<template>
	<div class="app-wrapper" :class="{ 'in-step': voting.inStep > 0 }">
		<header class="app-header">
			<div class="container">
				<nuxt-link to="/"><img class="logo" src="/images/logo.png" alt="INE"></nuxt-link>
			</div>
		</header>

		<div class="welcome-copy">
			<div class="container">
				<div class="copy">
					<h2>Welcome to the Mexican Digital Voting System</h2>
					<h3>Your vote is easier than ever!</h3>
					<p>Just follow 3 simple steps and you will be able to make your voice heard.</p>
				</div>

				<div class="steps" :class="`steps-${ voting.inStep }`">
					<nuxt-link to="/step1" class="step" :class="{ completed: voting.inStep > 1 }">
						<span class="number">1</span>
						<span class="icon">
							<icon name="material-symbols:check-small-rounded" />
						</span>
					</nuxt-link>
					<nuxt-link to="/step2" class="step" :class="{ completed: voting.inStep > 2 }">
						<span class="number">2</span>
						<span class="icon">
							<icon name="material-symbols:check-small-rounded" />
						</span>
					</nuxt-link>
					<nuxt-link to="/step3" class="step" :class="{ completed: voting.inStep > 3 }">
						<span class="number">3</span>
						<span class="icon">
							<icon name="material-symbols:check-small-rounded" />
						</span>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>

	<div class="content-wrapper">
		<div class="scroll-wrapper">
			<nuxt-page />
		</div>
	</div>

	<footer class="app-footer">
		<p class="mb-0 text-muted">Your decision is important, VOTE.</p>

		<img class="urn" src="/images/urna.svg" alt="">
	</footer>
</template>

<script setup>

	const voting = useVotingStore();
	const route = useRoute();
	const router = useRouter();



	// watch the route
	watch(() => route.path, (path) => {
		if(path === '/') {
			voting.inStep = 0;
		} else if(path === '/thanks') {
			voting.inStep = 4;
		} else {
			voting.inStep = parseInt(path.replace('/step', ''));
		}
	});

	onMounted(() => {
		const path = route.path;

		if(path === '/') {
			voting.inStep = 0;
		} else if(path === '/thanks') {
			voting.inStep = 4;
		} else {
			voting.inStep = parseInt(path.replace('/step', ''));
		}
	});

</script>

<style lang="sass" scoped>
	.app-wrapper
		display: flex
		flex-direction: column

		.copy
			transition: all 0.5s ease
			height: 180px

			& > *
				transition: all 0.25s ease

			h2
				left: 0

			h3
				right: 0

		&.in-step
			.copy
				opacity: 0
				height: 10px

				h2
					left: -50px

				h3
					right: -50px

		.app-header
			background: white
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.25)

			.logo
				max-width: 100px

		.welcome-copy
			background: url('/images/background.jpg') no-repeat center center
			color: white
			padding: 4rem 0 0
			text-align: center
			text-wrap: balance
			overflow-x: clip

		.steps
			width: 80%
			max-width: 400px
			display: flex
			justify-content: space-between
			margin: 0 auto -24px
			z-index: 100
			transition: all 0.5s ease

			&.steps-4
				opacity: 0

			.step
				border: 2px solid white
				font-size: 1rem
				background: #CE0082
				width: 50px
				aspect-ratio: 1
				display: flex
				justify-content: center
				align-items: center
				border-radius: 50%
				color: white
				text-decoration: none
				transition: all 0.3s ease-in-out

				.number
					transition: all 0.3s ease-in-out

				.icon
					position: absolute
					top: 0
					left: 0
					width: 100%
					height: 100%
					display: flex
					justify-content: center
					align-items: center
					font-size: 1.2rem
					opacity: 0
					transform: scale(1.1)
					transition: all 0.3s ease-in-out

				&.completed
					background: white
					color: #CE0082

					.icon
						color: #CE0082
						opacity: 1
						transform: scale(1)

					.number
						opacity: 0

	.content-wrapper
		flex-grow: 1
		display: flex
		justify-content: center
		align-items: center
		padding: 3rem 1rem 1rem

		.scroll-wrapper
			position: absolute
			top: 2rem
			left: 0
			width: 100%
			height: calc(100% - 2rem)
			overflow-y: auto
			padding: 1rem

	.app-footer
		border-top: 1px solid var(--bs-border-color)
		padding: 1rem

		.urn
			position: absolute
			width: 70px
			right: 1rem
			top: -1rem
</style>