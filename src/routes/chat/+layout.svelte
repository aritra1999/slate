<script lang="ts">
	import type { Chat } from '$lib/types';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/ui/app-sidebar/app-sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';

	let { children } = $props();

	let selectedChat = $derived<Chat | undefined>(
		$selectedChatStore ? $chatStore.get($selectedChatStore) : undefined
	);
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset class="flex h-screen flex-col overflow-hidden">
		<Sidebar.Inset>
			<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				{#if selectedChat}
					{selectedChat.title}
				{:else}
					New Chat
				{/if}
			</header>
			<div class="h-[calc(100vh-4rem)] flex-col px-4">
				{@render children?.()}
			</div>
		</Sidebar.Inset>
	</Sidebar.Inset>
</Sidebar.Provider>

<Toaster position="top-right" />
