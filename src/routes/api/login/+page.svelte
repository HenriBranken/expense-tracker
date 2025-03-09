<script>
	import { signIn } from '@auth/sveltekit/client';
	import axios from 'axios';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let isRegistering = false;
	let errorMessage = '';
	let successMessage = '';

	const toggleIsRegistering = () => {
		isRegistering = !isRegistering;
	};

	const handleAuth = async () => {
		errorMessage = '';
		successMessage = '';

		try {
			if (isRegistering) {
				// Handle the Registration.
				if (password !== confirmPassword) {
					errorMessage = 'Passwords do not match.';
					return;
				}

				const response = await axios.post('/api/register', { email, password });

				successMessage = 'Registration successful!';
				isRegistering = false;
			} else {
				// Handle the Login.
				await signIn('credentials', { email, password, redirect: false });
			}
		} catch (error) {
			errorMessage = error.response?.data?.error || 'Something went wrong during registration.';
		}
	};
</script>

<form on:submit|preventDefault={handleAuth}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	{#if isRegistering}
		<input type="password" bind:value={confirmPassword} placeholder="Confirm Password" required />
	{/if}
	<button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
</form>

<!-- Defaults to:  'No Account? Register' -->
<button on:click={toggleIsRegistering}>
	{isRegistering ? 'Already have an account? Login' : 'No Account? Register'}
</button>

{#if errorMessage}
	<p>{errorMessage}</p>
{/if}

{#if successMessage}
	<p>{successMessage}</p>
{/if}
