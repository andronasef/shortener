<script>
  import { slide } from 'svelte/transition';
  import DeleteIcon from '~icons/material-symbols/delete-forever';
  import EditIcon from '~icons/material-symbols/edit-document';
  export let shortlinks;

  function deleteLink(key) {
    console.log('deleting', key);
    fetch(`https://shortlinks.deta.dev/${key}`, {
      method: 'DELETE',
    }).then(() => {
      shortlinks = shortlinks.filter((link) => link.key !== key);
    });
  }
  function editLink(key) {
    console.log('editing', key);
  }
</script>

<div class="w-full px-10">
  {#if shortlinks.length > 0}
    <div class="md:p-5 overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>#</th>
            <th>Short</th>
            <th>Long</th>
            <th>Clicks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          {#each shortlinks as shortlink, i}
            <tr class="hover:active">
              <th>{i}</th>
              <td><a href={`#/go/${shortlink.short}`}>{shortlink.short}</a></td>
              <td><a href={shortlink.long}>{shortlink.long}</a></td>
              <td>{shortlink.clicks}</td>
              <td class="flex gap-3">
                <a href={`#/edit/${shortlink.key}`}>
                  <button class="icon"><EditIcon /></button>
                </a>
                <a href="#">
                  <button
                    class="icon"
                    on:click={() => deleteLink(shortlink.key)}
                  >
                    <DeleteIcon />
                  </button>
                </a>
              </td>
            </tr>{/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="underline text-xl text-center">There's No Short Links</div>
  {/if}
</div>

<style>
  .icon {
    @apply text-lg cursor-pointer;
  }
</style>
