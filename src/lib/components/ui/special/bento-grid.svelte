<script lang="ts">
	import { cn } from '$lib/utils';

	let { className = undefined, children } = $props();
</script>

<div
	class={cn(
		'grid grid-cols-1 gap-4 sm:grid-cols-1 md:auto-rows-[15rem] md:grid-cols-2 lg:grid-cols-3',
		className
	)}
>
	{@render children?.()}
</div>
