<script context="module">
	const query = `
    {
      subscriptions {
        feedUrl
        playedEpisodes {
          episodeGuid
        }
      }
    }
  `

	export async function load({ fetch }) {
		const response = await fetch('http://localhost:8080/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query })
		})

		console.log({ response })

		if (response.ok) {
			const responseObj = await response.json()
			const subscriptions = responseObj.data.subscriptions

			return {
				props: {
					subscriptions
				}
			}
		}

		return {
			props: {
				status: response.status,
				error: 'Could not load data'
			}
		}
	}
</script>

<script>
	export let subscriptions
</script>

{#if subscriptions}
	<ul>
		{#each subscriptions as subscription}
			<li>{subscription.feedUrl}</li>
		{/each}
	</ul>
{:else}
	<p>No subscriptions... :(</p>
{/if}
