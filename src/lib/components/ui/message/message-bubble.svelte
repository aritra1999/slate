<script lang="ts">
	import { cn } from '$lib/utils';
	import { Sparkles, User, Loader2 } from 'lucide-svelte';
	import Markdown from '$lib/components/ui/markdown/markdown.svelte';

	let { class: className, role, content } = $props();
	let isThinking = $derived(role === 'assistant' && (!content || content.trim() === ''));
</script>

<div
	class={cn(
		role === 'user' ? 'justify-end' : 'justify-start',
		'max-w-screen my-4 flex w-full overflow-x-auto text-wrap'
	)}
>
	<div class={cn(role === 'user' ? 'text-right' : 'text-left', 'mb-4 flex max-w-3xl space-x-2')}>
		{#if role === 'system' || role === 'assistant'}
			<div class="flex size-10 items-center justify-center rounded-lg bg-violet-400 p-2.5">
				<Sparkles class="size-5 text-slate-950" />
			</div>
		{/if}
		<div
			class={cn(
				'w-full ',
				role === 'user' ? 'rounded-2xl rounded-tr-sm bg-accent px-6 py-4' : 'px-4',
				className
			)}
		>
			{#if isThinking}
				<div class="flex items-center py-2.5 text-muted-foreground">
					<Loader2 class="mr-2 size-4 animate-spin" />
					<span>Thinking...</span>
				</div>
			{:else if role === 'assistant'}
				<Markdown {content} />
			{:else}
				<div class="whitespace-pre-wrap">{content}</div>
			{/if}
		</div>
		{#if role === 'user'}
			<div class="flex size-10 items-center justify-center rounded-lg bg-orange-300 p-2.5">
				<User class="size-5 text-slate-950" />
			</div>
		{/if}
	</div>
</div>
