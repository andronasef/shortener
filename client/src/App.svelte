<script>
  import Router from 'svelte-spa-router';
  import Edit from './views/edit.svelte';
  import Go from './views/go.svelte';
  import Home from './views/home/home.svelte';
  const routes = {
    // Exact path
    '/': Home,
    '/go/:slug': Go,
    '/edit/:key': Edit,
  };
</script>

<body>
  <a href="/shortener/#">
    <h1 class="text-3xl font-bold text-center py-10">Simple Link Shortener</h1>
  </a>
  <div>
    <Router {routes} />
  </div>
</body>
