<script lang="ts">
	import type { Chat, Message } from '$lib/types';
	import MessageBubble from '$lib/components/ui/message/message-bubble.svelte';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';

	let selectedChat = $derived<Chat | undefined>(
		$selectedChatStore ? $chatStore.get($selectedChatStore) : undefined
	);

	let messages = $derived<Message[]>(
		selectedChat ? selectedChat.messages.filter((msg) => msg.role !== 'system') : []
	);
	let container: HTMLElement;

	function scrollToBottom() {
		container.scrollTop = container.scrollHeight;
	}

	$effect(() => {
		if (container && messages.length) {
			scrollToBottom();
		}
	});
</script>

<div bind:this={container} class="flex-1 overflow-y-auto p-4">
	{#if messages.length > 0}
		{#each messages as message}
			<MessageBubble role={message.role} content={message.content} class=""></MessageBubble>
		{/each}
	{:else}
		<div class="flex h-full items-center justify-center text-muted-foreground">
			<p>No messages yet. Start a conversation!</p>
		</div>
	{/if}
</div>
