<script>
  import { onMount } from 'svelte';
  import NewShortLink from './components/newShortLink.svelte';
  import ShortLinks from './components/shortLinks.svelte';
  let shortlinks = [];

  let short = '';
  let long = '';

  onMount(async function () {
    getShortLinks();
  });

  async function getShortLinks() {
    const response = await fetch('https://shortlinks.deta.dev/');
    shortlinks = (await response.json()).items;
  }
</script>

<div class="flex flex-col justify-center items-center gap-10">
  <NewShortLink bind:short bind:long {getShortLinks} />
  <ShortLinks {shortlinks} />
</div>
