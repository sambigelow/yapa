<script>
	let email;
	let password;
	let status = 'idle';

	async function register() {
		status = 'registering';
		const query = `
			mutation {
				register(email: "${email}", password: "${password}") {
					id
				}
			}
		`;

		try {
			const response = await fetch('http://localhost:8080/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ query })
			});
			const responseObj = await response.json();
			console.log({ responseObj });
		} catch {}
	}
</script>

<form on:submit|preventDefault={register}>
	<label>
		email:
		<input type="email" bind:value={email} />
	</label>
	<label>
		password:
		<input type="password" bind:value={password} />
	</label>
	<button type="submit" disabled={status === 'registering' || status === 'registered'}>
		Register
	</button>
</form>
