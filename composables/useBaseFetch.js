export const useBaseFetch = (request, opts = {}) => {
	const config = useRuntimeConfig();

	const baseOpts = { baseURL: config.public.baseURL, ...opts };

	// If user is logged in, add token to headers
	const authUser = useAuthUser();

	if(authUser.value) {
		// get authTokens from localStorage
		const token = localStorage.getItem('authToken');
		if(token) baseOpts.headers = [['Authorization', `Bearer ${ token }`]];
	}

	return useFetch(request, baseOpts);
};