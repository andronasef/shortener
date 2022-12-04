<script lang="ts">
  export let short, long, getShortLinks;
  let statusMessage;

  function newShortlink() {
    if (!short || !long) {
      statusMessage = 'Please enter a short and long link';
      return;
    }
    if (!long.startsWith('http')) {
      statusMessage = 'Please enter a valid long link';
      return;
    }
    if (short.length > 15 || short.length < 5) {
      statusMessage =
        'Short link should be less than 15 characters and more than 5 characters';
      return;
    }

    fetch('https://shortlinks.deta.dev/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        short,
        long,
      }),
    }).then(async (res) => {
      if (res.ok == true) {
        getShortLinks();
        statusMessage = (await res.json()).msg;
      } else {
        const errors = (await res.json()).errors;
        statusMessage = errors[0].msg;
      }
    });
  }
</script>

<form
  class="form-control flex flex-col gap-5 w-full justify-center md:flex-row items-center p-5 md:px-20"
>
  <div class="w-full md:w-96">
    <label class="label" for="">
      <span class="label-text">Short Url</span>
    </label>
    <input
      required
      bind:value={short}
      type="text"
      placeholder="Type here"
      min="5"
      max="15"
      class="input input-bordered w-full"
    />
  </div>
  <div class="w-full ">
    <label class="label" for="">
      <span class="label-text">Long Url</span>
    </label>
    <input
      min="5"
      bind:value={long}
      required
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full"
    />
  </div>
  <button on:click|preventDefault={newShortlink} class="md:self-end btn"
    >Submit</button
  >
</form>
{#if statusMessage}
  <p>{statusMessage}</p>
{/if}
