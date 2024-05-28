<template>
	<transition name="slide">
		<slot></slot>
	</transition>
</template>

<script setup>
</script>

<style lang="sass" scoped>

	.fade-enter-active,
	.fade-leave-active
		transition: opacity 0.3s

	.fade-enter-from,
	.fade-leave-to
		opacity: 0
</style>