export default defineNuxtRouteMiddleware(async (to) => {
	const user = useAuthUser();
	const { me } = useAuth();

	if(process.client) {
		const authToken = localStorage.getItem('authToken');

		if(authToken) await me(authToken);
		if(!user.value) return '/';
	}
});
