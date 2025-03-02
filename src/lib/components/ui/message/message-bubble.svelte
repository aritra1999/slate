<script lang="ts">
	import { cn } from '$lib/utils';
	import { Sparkles, User, Loader2 } from 'lucide-svelte';

	let { class: className, role, content } = $props();
	let isThinking = $derived(role === 'assistant' && (!content || content.trim() === ''));
</script>

<div class={cn(role === 'user' ? 'justify-end' : 'justify-start', 'flex w-full')}>
	<div class={cn(role === 'user' ? 'text-right' : 'text-left', 'mb-4 flex max-w-4xl space-x-2')}>
		{#if role === 'system' || role === 'assistant'}
			<div class="flex size-10 items-center justify-center rounded-lg bg-violet-400 p-2.5">
				<Sparkles class="size-5 text-slate-950" />
			</div>
		{/if}
		<div
			class={cn(
				'w-full rounded-2xl p-6',
				role === 'user' ? 'rounded-tr-sm bg-accent' : 'rounded-tl-sm bg-secondary',
				className
			)}
		>
			{#if isThinking}
				<div class="flex items-center text-muted-foreground">
					<Loader2 class="mr-2 size-4 animate-spin" />
					<span>Thinking...</span>
				</div>
			{:else}
				{content}
			{/if}
		</div>
		{#if role === 'user'}
			<div class="flex size-10 items-center justify-center rounded-lg bg-orange-300 p-2.5">
				<User class="size-5 text-slate-950" />
			</div>
		{/if}
	</div>
</div>
