<script lang="ts">
	import type { Chat, Message } from '$lib/types';
	import { Paperclip, Send } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
	import ModelDetails from '$lib/components/ui/model-details/model-details.svelte';
	import MessageContainer from '$lib/components/ui/message/message-container.svelte';
	import MessageBubble from '$lib/components/ui/message/message-bubble.svelte';
	import { communicateToOllamaModel } from '$lib/services/ollama';
	import { toast } from 'svelte-sonner';

	let input: string = $state('');
	let disableSend = $state(true);
	let isLoading = $state(false);

	let selectedChat = $derived<Chat | undefined>(
		$selectedChatStore ? $chatStore.get($selectedChatStore) : undefined
	);

	$effect(() => {
		disableSend = input.length < 2 || isLoading;
	});

	function handleKeydown(e: KeyboardEvent) {
		// Handle Ctrl+Enter or Cmd+Enter
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault(); // Prevent default to avoid new line in textarea
			if (!disableSend) {
				chat(new Event('submit')); // Trigger the chat function
			}
		}
	}

	async function chat(e: Event) {
		e.preventDefault();
		if (selectedChat && $selectedChatStore) {
			isLoading = true;

			// Create user message
			const userMessage: Message = {
				role: 'user',
				content: input
			};

			// Add user message to chat
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

			// Clear input immediately after showing user message
			input = '';

			// Get updated chat with the new user message
			const currentChat = chatStore.getChat($selectedChatStore);

			if (currentChat && currentChat.model) {
				try {
					// Add an initial empty assistant message to display the stream
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

					// Create a local variable to track the complete message content
					let accumulatedContent = '';

					// Call Ollama API with streaming
					const result = await communicateToOllamaModel(
						currentChat.model.name,
						currentChat.messages,
						(latestContent) => {
							// Store the complete content from the API
							accumulatedContent = latestContent;

							// Update the assistant message with the accumulated content
							chatStore.update((chats) => {
								const chat = chats.get($selectedChatStore!);
								if (chat) {
									const messages = [...chat.messages];
									const lastIndex = messages.length - 1;

									if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
										messages[lastIndex] = {
											...messages[lastIndex],
											content: accumulatedContent
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
	}
</script>

<div class="container flex h-full flex-col overflow-hidden">
	{#if selectedChat}
		<div class="flex-none border-b px-4 pb-4">
			<h2 class="text-xl font-semibold">{selectedChat.title}</h2>
		</div>

		<MessageContainer />

		<div class="flex-none p-4">
			<form class="rounded-3xl border-2 bg-sidebar p-2" onsubmit={chat}>
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
						<Button class="rounded-2xl" size="icon" disabled>
							<Paperclip />
						</Button>
					</div>
					<div class="flex items-center">
						<span class="mr-2 text-xs text-muted-foreground">Ctrl+Enter to send</span>
						<Button class="rounded-2xl" size="icon" type="submit" disabled={disableSend}>
							<Send />
						</Button>
					</div>
				</div>
			</form>
		</div>
	{:else}
		<div class="flex h-full items-center justify-center">
			<MessageBubble role="system" class="">
				<img
					src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3huOWZ6YjY1NGkwY2t4bDd0bW5qcjUweGxpb2NoYWwwZGh5aDlydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/a5viI92PAF89q/giphy.gif"
					class="mb-4 w-full rounded-lg"
					alt=""
				/>
				<div class="mb-4">No chat's selected</div>
				<div class="space-x-3">
					<NewChat>
						<Dialog.Trigger
							class={buttonVariants({ variant: 'default', size: 'sm' })}
							aria-label="Start new chat"
						>
							Start a chat
						</Dialog.Trigger>
					</NewChat>
					<NewModel>
						<Dialog.Trigger
							class={buttonVariants({ variant: 'accent', size: 'sm' })}
							aria-label="Add a model"
						>
							Add a model
						</Dialog.Trigger>
					</NewModel>
				</div>
			</MessageBubble>
		</div>
	{/if}
</div>
