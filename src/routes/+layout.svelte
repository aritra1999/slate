<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Slate</title>
</svelte:head>

<ModeWatcher />
<main>
	{@render children()}
</main>
