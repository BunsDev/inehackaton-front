export const useAuth = () => {

	const authUser = useAuthUser();

	const setUser = (user) => {
		if(process.client && user && user.accessToken) localStorage.setItem('authToken', user.accessToken);
		authUser.value = user;
	};

	const login = async ({
		username,
		password,
	}) => {

		const { error, data } = await useBaseFetch('/users/login', {
			method: 'POST',
			body: { username, password },
		});

		if(!error.value) setUser(data.value.data);

		return { error, data };
	};

	const logout = async () => {
		// TODO: Check how to use cookies instead of localStorage
		if(process.client) localStorage.setItem('authToken', null);
		setUser(false);

		navigateTo('/');
	};

	const me = async (token) => {
		if(!authUser.value) {
			try {
				if(!!token && token !== 'null') {

					const { error, data } = await useBaseFetch('/users/me', {
						method: 'GET',
						// TODO: maybe we dont need to pass this
						headers: [
							[ 'Authorization', `Bearer ${ token }` ],
						],
					});

					if(!error.value) setUser(data.value.data);
				}

			} catch(error) {
				console.log(error);
			}
		}

		return authUser;
	};

	return {
		login,
		logout,
		me,
		setUser,
	};
};