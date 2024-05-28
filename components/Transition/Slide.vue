<template>
	<transition v-if="type === 'transition'" name="slide" @enter="onEnter" @leave="onLeave" v-bind="$attrs">
		<slot></slot>
	</transition>
	<transition-group v-else name="slide" @enter="onEnter" @leave="onLeave" v-bind="$attrs">
		<slot></slot>
	</transition-group>
</template>

<script setup>
	// import jquery
	import $ from 'jquery';

	// props
	const props = defineProps({
		duration: {
			type: Number,
			default: 500,
		},
		group: {
			type: Boolean,
			default: false,
		},
		leaveCallback: {
			type: Function,
			default: () => {},
		},
		enterCallback: {
			type: Function,
			default: () => {},
		},
	});

	const type = props.group ? 'transition-group' : 'transition';

	const onEnter = (el, done) => {
		$(el).hide();
		$(el).slideDown(props.duration, () => {
			props.enterCallback();
			done();
		});
	};

	const onLeave = (el, done) => {
		$(el).slideUp(props.duration, () => {
			props.leaveCallback();
			done();
		});
	};
</script>