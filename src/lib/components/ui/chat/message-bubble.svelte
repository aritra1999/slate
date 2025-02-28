<script lang="ts">
	import { cn } from '$lib/utils';
	import { Sparkles, User } from 'lucide-svelte';

	let { class: className, role, children } = $props();
</script>

<div class={cn(role === 'user' ? 'justify-end' : 'justify-start', 'flex w-full')}>
	<div class={cn(role === 'user' ? 'text-right' : 'text-left', 'mb-4 flex max-w-4xl space-x-4')}>
		{#if role === 'system' || role === 'assistant'}
			<div class="flex size-10 items-center justify-center rounded-lg bg-violet-400 p-2">
				<Sparkles class="size-5 text-slate-950" />
			</div>
		{/if}
		<div
			class={cn(
				role === 'user' ? 'bg-sidebar ' : 'bg-secondary',
				'w-full rounded-2xl p-6',
				className
			)}
		>
			{@render children()}
		</div>
		{#if role === 'user'}
			<div class="flex size-10 items-center justify-center rounded-lg bg-orange-300 p-2">
				<User class="size-5 text-slate-950" />
			</div>
		{/if}
	</div>
</div>
