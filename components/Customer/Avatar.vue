<template>
	<img
		:src="`${ config.public.baseURL }/users/${ user.id }/avatar?width=${ size }`"
		class="avatar ratio ratio-1x1 rounded-circle"
		:alt="`${user?.firstname} ${user?.lastname}`"
	>
</template>

<script setup>

	// receive user via props
	const props = defineProps({
		user: {
			type: Object,
			required: true
		},
		size: {
			type: [String, Number],
			default: ''
		}
	});

	const config = useRuntimeConfig();

</script>

<!--suppress SassScssResolvedByNameOnly -->
<style lang="sass" scoped>
	img
		aspect-ratio: 1
		object-fit: cover
		max-width: 100%
</style>