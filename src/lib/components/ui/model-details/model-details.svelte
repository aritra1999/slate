<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';
	import type { Message } from '$lib/types';

	let { selectedChat } = $props();
</script>

{#if selectedChat}
	{@const model = selectedChat.model}
	{@const systemPrompt = selectedChat.messages.find(
		(message: Message) => message.role === 'system'
	)}
	<Popover.Root>
		<Popover.Trigger
			class={cn(buttonVariants({ variant: 'accent' }), 'rounded-sm rounded-bl-2xl px-4')}
		>
			{model.title} - {model.name}, {model.temperature}
		</Popover.Trigger>
		<Popover.Content class="w-80 text-sm">
			<ul>
				<li><span class="font-bold"> Model </span> - {model.name}</li>
				<li><span class="font-bold"> Title </span> - {model.title}</li>
				<li><span class="font-bold"> Temperature </span> - {model.temperature}</li>
				{#if selectedChat}
					<li>
						<span class="font-bold"> System Prompt </span> - {#if systemPrompt}
							{selectedChat.messages[0].content}
						{:else}
							No system prompt was given!
						{/if}
					</li>
				{/if}
			</ul>
		</Popover.Content>
	</Popover.Root>
{/if}
