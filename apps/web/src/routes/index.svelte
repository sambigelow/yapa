<script lang="ts">
	import AccountForm from '$lib/AccountForm.svelte'
	import { mutation } from '@urql/svelte'

	const registerUser = mutation({
		query: `
      mutation ($emailAddress: String!, $password: String!) {
        registerUser(emailAddress: $emailAddress, password: $password) {
          id
          profile {
            id
          }
        }
      }
    `
	})

	const authenticateUser = mutation({
		query: `
      mutation ($emailAddress: String!, $password: String!) {
        authenticateUser(emailAddress: $emailAddress, password: $password)
      }
    `
	})
</script>

<div class="pageContainer">
	<h1>YAPA (Yet Another Podcast App)</h1>

	<hr />

	<h2>Register</h2>
	<AccountForm handleSubmit={registerUser} submitText="Register" />

	<hr />

	<h2>Log In</h2>
	<AccountForm handleSubmit={authenticateUser} submitText="Log In" />
</div>

<style>
	.pageContainer {
		max-width: 75ch;
		margin: 0 auto;
	}

	hr {
		margin: 2.5rem 0;
	}
</style>
