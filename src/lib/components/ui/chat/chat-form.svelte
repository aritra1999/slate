<script lang="ts">
	import { communicateToOllamaModel } from '$lib/services/ollama';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';
	import { Send } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import ChatAttachment from '$lib/components/ui/chat/chat-attachment.svelte';
	import ModelDetails from '$lib/components/ui/model-details/model-details.svelte';
	import { toast } from 'svelte-sonner';
	import type { Chat, Message } from '$lib/types';

	let input = $state('');
	let isLoading = $state(false);

	let disableSend = $derived(input.length < 2 || isLoading);
	let selectedChat = $derived<Chat | undefined>(
		$selectedChatStore ? $chatStore.get($selectedChatStore) : undefined
	);

	function onUpdate(messageContent: string) {
		chatStore.update((chats) => {
			const chat = chats.get($selectedChatStore!);
			if (chat) {
				const messages = [...chat.messages];
				const lastIndex = messages.length - 1;

				if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
					messages[lastIndex] = {
						...messages[lastIndex],
						content: messageContent
					};
				}

				const updatedChat = {
					...chat,
					messages,
					updatedAt: new Date()
				};

				const newChats = new Map(chats);
				newChats.set($selectedChatStore!, updatedChat);
				return newChats;
			}
			return chats;
		});
	}

	async function chat(e: Event) {
		e.preventDefault();
		if (!selectedChat || !$selectedChatStore) return;
		isLoading = true;

		const userMessage: Message = {
			role: 'user',
			content: input
		};

		chatStore.update((chats) => {
			const chat = chats.get($selectedChatStore!);
			if (chat) {
				const updatedChat = {
					...chat,
					messages: [...chat.messages, userMessage],
					updatedAt: new Date()
				};
				const newChats = new Map(chats);
				newChats.set($selectedChatStore!, updatedChat);
				return newChats;
			}
			return chats;
		});

		input = '';
		const currentChat = chatStore.getChat($selectedChatStore);
		if (currentChat && currentChat.model) {
			try {
				const initialAssistantMessage: Message = {
					role: 'assistant',
					content: ''
				};

				chatStore.update((chats) => {
					const chat = chats.get($selectedChatStore!);
					if (chat) {
						const updatedChat = {
							...chat,
							messages: [...chat.messages, initialAssistantMessage],
							updatedAt: new Date()
						};
						const newChats = new Map(chats);
						newChats.set($selectedChatStore!, updatedChat);
						return newChats;
					}
					return chats;
				});

				let accumulatedContent = '';
				const result = await communicateToOllamaModel(
					currentChat.model.name,
					currentChat.messages,
					(latestContent) => {
						accumulatedContent = latestContent;
						onUpdate(accumulatedContent);
					}
				);

				if (!result.success) {
					toast.error('Failed to get response from model: ' + result.error.message);
				}
			} catch (error) {
				toast.error('An error occurred while communicating with the model');
				console.error(error);
			} finally {
				isLoading = false;
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault();
			if (!disableSend) {
				chat(new Event('submit'));
			}
		}
	}
</script>

<div class="flex-none py-4">
	<form class="rounded-3xl bg-secondary p-3" onsubmit={chat}>
		<textarea
			bind:value={input}
			onkeydown={handleKeydown}
			class="w-full resize-none overflow-y-auto bg-transparent px-3 py-2.5 placeholder:text-muted-foreground focus:outline-0"
			placeholder="What's on your mind?"
			rows="3"
			disabled={isLoading}
		></textarea>
		<div class="flex items-start justify-between">
			<div class="flex space-x-2">
				<ModelDetails {selectedChat} />
				<ChatAttachment />
			</div>
			<div class="flex items-center">
				<span class="mr-2 hidden text-xs text-muted-foreground sm:block">Ctrl+Enter to send</span>

				<Button class="rounded-sm rounded-br-2xl" size="icon" type="submit" disabled={disableSend}>
					<Send />
				</Button>
			</div>
		</div>
	</form>
</div>
