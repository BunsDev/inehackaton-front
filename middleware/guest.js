export default defineNuxtRouteMiddleware(async (to) => {
	const user = useAuthUser();
	const { me } = useAuth();

	if (process.client) {
		const authToken = localStorage.getItem('authToken') || null

		if (authToken) await me(authToken)
		if (user.value) return '/dashboard';
	}
})
