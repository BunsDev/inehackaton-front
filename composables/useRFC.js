import { calculateMexicanRFC } from 'calculate-rfc';

export const useRFC = () => {

	const calculateRFC = (obj) => {
		if(!obj.firstname || !obj.lastname || !obj.secondLastname || !obj.dob) {
			console.warn('Missing parameters', obj);
			return;
		}

		// get day, month and year from dob where dob is a date string with format YYYY-MM-DD
		let [ year, month, day ] = obj.dob.split('-');

		console.log(calculateMexicanRFC({
			name: obj.firstname,
			patronymic: obj.lastname,
			matronymic: obj.secondLastname,
			day,
			month,
			year,
		}));

		return calculateMexicanRFC({
			name: obj.firstname,
			patronymic: obj.lastname,
			matronymic: obj.secondLastname,
			day,
			month,
			year,
		});
	};

	return {
		calculateRFC,
	};
};