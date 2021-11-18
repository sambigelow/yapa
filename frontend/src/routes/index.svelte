<script>
let result;
let status = 'fetching'
let error = null;
fetch('http://localhost:8080/api/').then(res => res.json()).then(res => {
  result = res.data
  status = 'success'
}).catch(e => {
  status = 'error'
  error = e.message
})
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p> From Server: 
  <span>
    {#if status === 'fetching'}
      loading...
    {:else if status === 'success'}
      {result}
    {:else if status === 'error'}
      (Request failed...) error: {error}
    {:else}
      Uh Oh! Unknown state...
    {/if}
  </span>
</p>