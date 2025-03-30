<script lang="ts">
	import { mode } from 'mode-watcher';

	let { images } = $props();
	let current = $state('');

	$effect(() => {
		current = $mode === 'dark' ? images['dark'] : images['light'];
	});
</script>

{#if current}
	<div class="group relative h-full w-full">
		<img src={current} class="h-full w-full rounded-lg object-cover" alt={images.title || 'Page illustration'} />
		{#if images.description}
			<div
				class="absolute bottom-2 right-2 rounded-lg bg-foreground px-4 py-2 text-right font-medium text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:px-6 sm:py-4"
			>
				<h1 class="text-lg sm:text-xl">{images.title}</h1>
				<p class="text-sm text-muted-foreground">{images.description}</p>
			</div>
		{/if}
	</div>
{/if}
