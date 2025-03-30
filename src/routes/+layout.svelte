<script lang="ts">
	import posthog from 'posthog-js';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { PUBLIC_POSTHOG_TOKEN } from '$env/static/public';

	let { children } = $props();

	onMount(() => {
		if (browser) {
			posthog.init(PUBLIC_POSTHOG_TOKEN, {
				api_host: 'https://eu.i.posthog.com',
				person_profiles: 'always'
			});
		}
		return;
	});
</script>

<svelte:head>
	<title>Slate</title>
</svelte:head>

<ModeWatcher />
<main>
	{@render children()}
</main>
