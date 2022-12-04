<script>
  import { onMount } from 'svelte';
  import { location } from 'svelte-spa-router';

  let long, short, key;
  let status = '';

  onMount(async function () {
    const keySlug = $location.split('/').pop();
    await fetch(`https://shortlinks.deta.dev/key/${keySlug}`)
      .then((res) => res.json())
      .then((data) => {
        key = data.key;
        long = data.long;
        short = data.short;
      });
  });

  async function update() {
    status = 'Updating...';
    let updateObject = {};
    if (long) updateObject.long = long;
    if (short) updateObject.short = short;

    await fetch(`https://shortlinks.deta.dev/${key}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateObject),
    })
      .then((res) => res.json())
      .then((data) => {
        status = data.msg;
      });
  }
</script>

<div class="flex flex-col p-10 justify-center items-center gap-5 ">
  <div>{status}</div>

  <label class="label">
    <span class="label-text">Key</span>
  </label>

  <input type="text" disabled bind:value={key} />
  <label class="label">
    <span class="label-text">Long Link</span>
  </label>
  <input type="text" bind:value={long} />
  <label class="label">
    <span class="label-text">Short Link</span>
  </label>
  <input type="text" bind:value={short} />
  <div class="flex flex-row gap-3">
    <button class="btn" on:click={update}>Update</button>
    <a href="/shortener/#"><button class="btn">Cancel</button></a>
  </div>
</div>

<style>
  label {
    @apply md:w-1/3 self-start md:self-center;
  }
  input {
    @apply input input-bordered w-full md:w-1/3;
  }
</style>
