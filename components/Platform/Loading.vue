<template>
	<loading
		:active="active"
		:is-full-page="isFullPage"
	/>
</template>

<script setup>
	import Loading from 'vue3-loading-overlay';
	import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

	// receive active via props
	const props = defineProps({
		active: {
			type: Boolean,
			default: false,
		},
		isFullPage: {
			type: Boolean,
			default: false,
		},
	});

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

</style>