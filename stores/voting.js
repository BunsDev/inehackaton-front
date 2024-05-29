import { defineStore } from 'pinia';

export const useVotingStore = defineStore('votingStore', () => {

	const ine = ref(null);
	const ineFront = ref(null);
	const ineBack = ref(null);
	const idMex = ref(null);
	const party = ref(null);
	const faceRecognition = ref(false);
	const faceSimilarity = ref({
		matched: false,
		similarity: 0,
	});


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
		party,
		faceRecognition,
		faceSimilarity
	};
});