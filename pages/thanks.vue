<template>
	<div class="thanks-wrapper">

		<div class="copy text-center">
			<h2>Gracias</h2>
			<h4>Por ser parte de nuestra democracia.</h4>

			<div class="voting-animation mb-4">
				<img class="urn-front" src="/images/urna-front.svg" alt="">
				<img class="urn-back" src="/images/urna-back.svg" alt="">
				<img class="boleta" src="/images/boleta.svg" alt="">
			</div>

			<p>Tu voto ha sido registrado correctamente dentro del <strong>Blockchain</strong>.</p>

			<p>
				<a
					:href="voting.voteInfo.urlTestnet"
					target="_blank"
					class="btn rounded-pill btn-start w-100 btn-primary"
				>Ver mi voto en blockchain</a>
			</p>

			<div class="nft">
				<platform-loading :active="!!nftLoading" :is-full-page="false" />

				<div class="d-flex align-items-center justify-content-center mb-3">
					<img class="nft-image" src="/images/nft.jpg" alt="">
					<h5 class="mb-0">¿Deseas reclamar tu NFT que demuestra que votaste?</h5>
				</div>

				<template v-if="!nftUrl">
					<p>Introduce una dirección de cartera:</p>
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Dirección" v-model="nftAddress">
						<button @click="claimNFT" class="btn btn-primary">Reclamar NFT</button>
					</div>
				</template>

				<template v-else>
					<p class="mb-0">
						<a
							:href="nftUrl.urlTestnet"
							target="_blank"
							class="btn rounded-pill btn-start w-100 btn-primary"
						>Ver mi NFT</a>
					</p>
				</template>
			</div>
		</div>
	</div>

</template>

<script setup>

	import Velocity from 'velocity-animate';

	const voting = useVotingStore();
	const nftAddress = ref('');
	const nftUrl = ref('');
	const nftLoading = ref(false);

	const claimNFT = async () => {
		if(nftAddress.value) {
			nftLoading.value = true;
			nftUrl.value = await voting.mintVoteProof(nftAddress.value);
			nftLoading.value = false;
		}
	};

	const animateBoleta = () => {
		const boleta = document.querySelector('.boleta');

		Velocity(boleta, {
			opacity: 0,
			rotateZ: '-10deg',
		}, {
			duration: 1,

		});

		// fade in boleta
		Velocity(boleta, {
			opacity: 1,
		}, {
			duration: 500,
			delay: 100,
			complete: () => {
				// animate boleta counter clockwise
				Velocity(boleta, {
					rotateZ: '-40deg',
				}, {
					duration: 1000,
					delay: 1500,
					easing: 'easeInOut',
					complete: () => {
						// animate boleta clockwise
						Velocity(boleta, {
							rotateZ: '-10deg',
							opacity: 0,
						}, {
							delay: 1500,
							duration: 1,
							easing: 'easeInOut',
							complete: () => {
								animateBoleta();
							},
						});
					},
				});
			},
		});
	};

	onMounted(() => {
		animateBoleta();
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

	.nft
		border: 1px solid #ccc
		padding: 1rem
		border-radius: 0.5rem

		.nft-image
			width: 50px
			border-radius: 50%

	.voting-animation
		width: 200px
		aspect-ratio: 1
		margin: 0 auto

		&:before
			content: ''
			display: block
			width: 100%
			height: 100%
			border-radius: 50%
			background: $brand1

		.urn-back
			position: absolute
			width: 80%
			left: 50%
			top: 50%
			transform: translate(-50%, -50%)
			z-index: 8

		.urn-front
			position: absolute
			width: 80%
			left: 50%
			top: 50%
			transform: translate(-50%, -50%)
			z-index: 10

		.boleta
			position: absolute
			width: 20%
			z-index: 9
			top: 0
			right: 20%
			transform: rotate(-10deg)
			// change origin to top left
			transform-origin: 120px 120px
			opacity: 0

</style>