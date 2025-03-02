<script lang="ts">
	import type { Chat, Message } from '$lib/types';
	import MessageBubble from '$lib/components/ui/message/message-bubble.svelte';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';

	let selectedChat = $derived<Chat | undefined>(
		$selectedChatStore ? $chatStore.get($selectedChatStore) : undefined
	);

	let messages = $derived<Message[]>(selectedChat ? selectedChat.messages : []);
</script>

{#each messages as message}
	<MessageBubble role={message.role} class="">{message.content}</MessageBubble>
{/each}
