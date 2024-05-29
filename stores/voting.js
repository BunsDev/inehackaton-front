import { defineStore } from 'pinia';

export const useVotingStore = defineStore('votingStore', () => {

		const ine = ref(null);
		const ineFront = ref(null);
		const ineBack = ref(null);
		const idMex = ref(null);

		const stateVote = ref(null);
		const federalVote = ref(null);

		const candidates = ref({
			federales: [
				{
					candidate: 'Xóchitl Gálvez',
					address: '0x8532a6CbEA6a7d30B46E5a015391840Ff1C472F3',
					party: 'PAN',
					partyName: 'Partido Acción Nacional',
					partyImage: 'pan.svg',
					slug: 'pan'
				},
				{
					candidate: 'Claudia Sheinbaum',
					address: '0x1234567890123456789012345678901234567891',
					party: 'MORENA',
					partyName: 'Movimiento de Regeneración Nacional',
					partyImage: 'morena.svg',
					slug: 'morena'
				},
				{
					candidate: 'Jorge Álvarez Máynez',
					address: '0x1234567890123456789012345678901234567892',
					party: 'MC',
					partyName: 'Movimiento Ciudadano',
					partyImage: 'movimiento-ciudadano.svg',
					slug: 'movimiento-ciudadano'
				},
			],
			estatales: [
				{
					candidate: 'Clara Brugada',
					address: '0xAF0C47284442069bedF8F01B954DE9CAD0fB51De',
					party: 'MORENA',
					partyName: 'Movimiento de Regeneración Nacional',
					partyImage: 'morena.svg',
					slug: 'morena'
				},
				{
					candidate: 'Santiago Taboada',
					address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
					party: 'PAN',
					partyName: 'Partido Acción Nacional',
					partyImage: 'pan.svg',
					slug: 'pan'
				},
				{
					candidate: 'Salomón Chertorivski',
					address: '0x3BCE63C6C9ABf7A47f52c9A3a7950867700B0158',
					party: 'MC',
					partyName: 'Movimiento Ciudadano',
					partyImage: 'movimiento-ciudadano.svg',
					slug: 'movimiento-ciudadano'
				},
			],
		});

		const photo = ref(null);
		const selfie = ref(null);

		const inStep = ref(0);
		const faceRecognition = ref(false);
		const faceSimilarity = ref({
			matched: false,
			similarity: 0,
		});

		const castVote = async (candidate) => {

			const { data, error } = await useBaseFetch('/web3/vote', {
				method: 'POST',
				body: JSON.stringify({
					candidate,
					idMex: idMex.value,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			return data.value.data;

		};

		const mintVoteProof = async (addr) => {
			const { data, error } = await useBaseFetch('/web3/mint', {
				method: 'POST',
				body: JSON.stringify({
					address: addr,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			return data.value.data;
		};

		const setFederalParty = (party) => {
			federalVote.value = party;
		};

		const setStateParty = (party) => {
			stateVote.value = party;
		}

		const getCandidate = async (candidate) => {
			const { data, error } = await useBaseFetch(`/web3/${ candidate }/candidate`, {
				method: 'GET',
			});
			return data.value.data;
		};

		return {
			ine,
			ineFront,
			ineBack,
			photo,
			idMex,
			selfie,
			inStep,
			stateVote,
			federalVote,
			castVote,
			mintVoteProof,
			getCandidate,
			candidates,
			faceRecognition,
			faceSimilarity,
			setFederalParty,
			setStateParty,
		};
	})
;