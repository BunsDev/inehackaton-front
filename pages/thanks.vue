<template>
	<div class="thanks-wrapper">

		<h4>Tu voto ha sido registrado correctamente</h4>
		<pre>{{ voting.voteInfo }}</pre>

	</div>

</template>

<script setup>

	const voting = useVotingStore();


</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

</style>