<script>
  import { onMount } from 'svelte';
  import { location } from 'svelte-spa-router';

  let msg = '';
  onMount(async function () {
    const slug = $location.split('/').pop();
    await fetch(`https://shortlinks.deta.dev/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          msg = `Redirecting to the ${data.url}`;
          window.location.href = data.url;
        } else {
          msg = 'Link Not Found';
          setTimeout(() => (window.location.href = '/'), 3000);
        }
      });
  });
</script>

<div class="flex flex-col justify-center items-center flex-grow text-3xl">
  {msg}
</div>
