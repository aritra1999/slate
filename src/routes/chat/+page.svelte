<script lang="ts">
	import type { Chat } from '$lib/types';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';
	import ChatForm from '$lib/components/ui/chat/chat-form.svelte';
	import NoChatSelected from '$lib/components/ui/chat/no-chat-selected.svelte';
	import MessageContainer from '$lib/components/ui/message/message-container.svelte';

	let selectedChat = $derived<Chat | undefined>(
		$selectedChatStore ? $chatStore.get($selectedChatStore) : undefined
	);
</script>

<div class="h-full w-full overflow-hidden">
	<div class="container flex h-full flex-col overflow-hidden">
		{#if selectedChat}
			<MessageContainer />
			<ChatForm />
		{:else}
			<NoChatSelected />
		{/if}
	</div>
</div>
