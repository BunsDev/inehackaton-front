import { defineStore } from 'pinia';

export const useVotingStore = defineStore('votingStore', () => {

	const ine = ref(null);
	const ineFront = ref(null);
	const ineBack = ref(null);
	const idMex = ref(null);


	const photo = ref(null);
	const selfie = ref(null);

	const inStep = ref(0);

	return {
		ine,
		ineFront,
		ineBack,
		photo,
		idMex,
		selfie,
		inStep,
	};
});