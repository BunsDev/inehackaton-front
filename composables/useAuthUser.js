export const useAuthUser = () => {
	return useState('user', () => null);
};