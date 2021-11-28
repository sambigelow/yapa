<script context="module">
	import { createClient } from '@urql/svelte'

	const client = createClient({
		url: 'http://localhost:8080/graphql'
	})
</script>

<script>
	import { setClient } from '@urql/svelte'

	setClient(client)
</script>

<slot />
