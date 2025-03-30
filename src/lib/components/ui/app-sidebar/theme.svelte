<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { mode, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<Button onclick={toggleMode} variant="secondary" size="icon" class="rounded-lg">
	{#if $mode === 'light'}
		<Sun class="h-[1.2rem] w-[1.2rem]" />
	{:else}
		<Moon class="h-[1.2rem] w-[1.2rem]" />
	{/if}
</Button>
