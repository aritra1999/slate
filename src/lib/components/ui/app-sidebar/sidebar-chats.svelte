<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Chat } from '$lib/types';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';

	let chatsArray = $derived<Chat[]>(Array.from($chatStore.values()));

	function selectChat(chat: Chat) {
		selectedChatStore.set(chat.id);
	}
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem class="mb-4">
		<Sidebar.MenuSub>
			{#if chatsArray.length > 0}
				{#each chatsArray as chat}
					<Sidebar.MenuSubItem>
						<Sidebar.MenuSubButton>
							{#snippet child({ props })}
								<button
									{...props}
									onclick={() => selectChat(chat)}
									class={cn('w-full rounded-md px-4 py-3 no-underline hover:bg-sidebar-accent', {
										'bg-sidebar-accent': $selectedChatStore === chat.id
									})}
								>
									<div class="text-left">
										<div class="mb-1">{chat.title}</div>
										<div class="text-xs text-muted-foreground">
											{chat?.model?.title}
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
		</Sidebar.MenuSub>
	</Sidebar.MenuItem>
</Sidebar.Menu>
