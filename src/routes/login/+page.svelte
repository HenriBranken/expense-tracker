<script>
	import { signIn } from '@auth/sveltekit/client';
	import { goto } from '$app/navigation';

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
				const response = await fetch('/api/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, password })
				});

				if (response.ok) {
					successMessage = 'Registration successful!';
					const result = await signIn('credentials', {
						email,
						password,
						redirect: false
					});

					if (!result?.error) {
						goto('/expenses');
					} else {
						errorMessage = 'Login failed after registration.';
					}
				} else {
					const data = await response.json();
					errorMessage = data.error || 'Registration failed.';
				}
			} else {
				const result = await signIn('credentials', {
					email,
					password,
					redirect: false
				});

				if (!result?.error) {
					goto('/expenses');
				} else {
					errorMessage = 'Invalid credentials. Please try again.';
				}
			}
		} catch (error) {
			errorMessage = 'Something went wrong during authentication.';
			console.error(error);
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

<button on:click={toggleIsRegistering}>
	{isRegistering ? 'Already have an account? Login' : 'No Account? Register'}
</button>

{#if errorMessage}
	<p style="color: red;">{errorMessage}</p>
{/if}

{#if successMessage}
	<p style="color: green;">{successMessage}</p>
{/if}
