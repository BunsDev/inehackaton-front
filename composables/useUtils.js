export const useUtils = () => {

	const prettyDate = (date) => {
		// convert 2024-05-07T22:53:50.374Z to date in spanish format
		const d = new Date(date);
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return d.toLocaleDateString('es-MX', options);
	}

	return {
		prettyDate
	};
};