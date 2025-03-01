<script lang="ts">
	import { cn } from '$lib/utils';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { Chat } from '$lib/types';

	function selectChat(chat: Chat) {
		selectedChatStore.set(chat.id);
	}
</script>

<Sidebar.MenuItem class="mb-4">
	<Sidebar.MenuButton class="text-base font-medium">Chats</Sidebar.MenuButton>
	<Sidebar.MenuSub>
		{#if $chatStore.length > 0}
			{#each $chatStore as chat}
				<Sidebar.MenuSubItem>
					<Sidebar.MenuSubButton>
						{#snippet child({ props })}
							<button {...props} onclick={() => selectChat(chat)}>
								<div class="text-left">
									<div>{chat.title}</div>
									<div class="text-xs text-muted-foreground">
										{chat?.model?.title} - {chat?.model?.name}, {chat?.model?.temperature}
									</div>
								</div>
							</button>
						{/snippet}
					</Sidebar.MenuSubButton>
				</Sidebar.MenuSubItem>
			{/each}
		{:else}
			<Sidebar.MenuSubItem>
				<Sidebar.MenuSubButton>
					{#snippet child({ props })}
						<button {...props}>
							<div class="text-left">
								<div>No chats</div>
							</div>
						</button>
					{/snippet}
				</Sidebar.MenuSubButton>
			</Sidebar.MenuSubItem>
		{/if}
		<NewChat>
			<Sidebar.MenuSubItem>
				<Dialog.Trigger
					class={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'ml-2 px-6')}
					aria-label="Start new chat"
				>
					Add Chat
				</Dialog.Trigger>
			</Sidebar.MenuSubItem>
		</NewChat>
	</Sidebar.MenuSub>
</Sidebar.MenuItem>
