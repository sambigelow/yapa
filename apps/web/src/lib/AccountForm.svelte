<script lang="ts">
	interface AccountFormValues {
		emailAddress: string
		password: string
	}

	export let handleSubmit: (accountFormValues: AccountFormValues) => any
	export let submitText = 'Submit'

	let emailAddress = ''
	let password = ''
	let status: 'idle' | 'submitting' | 'success' | 'error'

	async function onSubmit() {
		handleSubmit({ emailAddress, password })
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<label>
		email address:
		<input type="email" bind:value={emailAddress} />
	</label>
	<label>
		password:
		<input type="password" bind:value={password} />
	</label>
	<div class="align-right">
		<button type="submit">{submitText}</button>
	</div>
</form>

<style>
	form > * + * {
		margin-top: 0.5rem;
	}

	label {
		display: block;
	}

	.align-right {
		margin-top: 1rem;
		text-align: right;
	}

	button {
		padding: 0.5rem 1.5rem;
		border-radius: 100rem;
		background-color: aliceblue;
		border-color: slategrey;
	}

	input {
		margin-top: 0.25rem;
	}
</style>
