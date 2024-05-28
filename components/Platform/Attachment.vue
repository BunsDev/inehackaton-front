<template>
	<img :src="`${ config.public.baseURL }/attachments/${ id }`">
</template>

<script setup>
	// receive attachment id via props
	const props = defineProps({
		id: {
			type: [String, Number],
			required: true
		}
	});

	const config = useRuntimeConfig();
</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>

</style>