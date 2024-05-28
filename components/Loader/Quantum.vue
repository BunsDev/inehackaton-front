<template>
	<l-quantum
		:size="size"
		:speed="speed"
		:color="color"
	></l-quantum>
</template>

<script setup>
	import 'ldrs/quantum';

	const props = defineProps({
		size: {
			type: [String, Number],
			default: 45
		},
		speed: {
			type: [String, Number],
			default: 1.75
		},
		color: {
			type: String,
			default: '#6C3FE5'
		}
	});
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

</style>