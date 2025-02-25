import axios from 'axios';

const AUTH_API_URL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:5173/api/auth' : '/api/auth';

// Try this out later:
// const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || '/api/auth';

export const login = async (username, password) => {
	try {
		await axios.post(AUTH_API_URL, { action: 'login', username, password });
		return 'Login Successful';
	} catch (error) {
		console.error(`Inside luciaApi.js, the error for login attempt is:\n${error}.`);
		return 'Login Failed';
	}
};

export const logout = async () => {
	try {
		await axios.post(AUTH_API_URL, { action: 'logout' });
		return 'Logged Out!';
	} catch (error) {
		console.error(`Inside luciaApi.js, the error for logout attempt is:\n${error}`);
		return 'Logout Failed';
	}
};
