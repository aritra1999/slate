<script lang="ts">
	import type { Chat, Message } from '$lib/types';
	import { Paperclip, Send } from 'lucide-svelte';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
	import ModelDetails from '$lib/components/ui/model-details/model-details.svelte';
	import MessageContainer from '$lib/components/ui/message/message-container.svelte';

	let input: string = $state('');
	let disableSend = $state(true);

	let selectedChat = $derived<Chat | undefined>(
		$selectedChatStore ? $chatStore.get($selectedChatStore) : undefined
	);

	$effect(() => {
		disableSend = input.length < 2;
	});

	function handleKeydown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault();
			if (!disableSend) {
				chat(new Event('submit'));
			}
		}
	}

	function chat(e: Event) {
		e.preventDefault();
		if (selectedChat && $selectedChatStore) {
			const message: Message = {
				role: 'user',
				content: input
			};

			chatStore.update((chats) => {
				const updatedChat = {
					...selectedChat!,
					messages: [...selectedChat!.messages, message],
					updatedAt: new Date()
				};
				const newChats = new Map(chats);
				newChats.set($selectedChatStore!, updatedChat);
				return newChats;
			});
		}
		input = '';
	}
</script>

{#if selectedChat}
	<div class="container flex h-full flex-col overflow-hidden">
		<div class="flex-none border-b px-4 pb-4">
			<h2 class="text-xl font-semibold">{selectedChat.title}</h2>
		</div>

		<div class="flex-1 overflow-y-auto p-4">
			<MessageContainer />
		</div>

		<div class="flex-none p-4">
			<form class="rounded-3xl border-2 bg-sidebar p-2" onsubmit={chat}>
				<textarea
					bind:value={input}
					onkeydown={handleKeydown}
					class="w-full resize-none overflow-y-auto bg-transparent px-3 py-2.5 placeholder:text-muted-foreground focus:outline-0"
					placeholder="What's on your mind?"
					rows="3"
				></textarea>
				<div class="flex items-start justify-between">
					<div class="flex space-x-2">
						<ModelDetails {selectedChat} />
						<Button class="rounded-2xl" size="icon" disabled>
							<Paperclip />
						</Button>
					</div>
					<Button class="rounded-2xl" size="icon" type="submit" disabled={disableSend}>
						<Send />
					</Button>
				</div>
			</form>
		</div>
	</div>
{:else}
	<div class="flex h-full items-center justify-center px-4">
		<div>
			<div class="mb-4">No chat's selected</div>
			<img
				src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3huOWZ6YjY1NGkwY2t4bDd0bW5qcjUweGxpb2NoYWwwZGh5aDlydiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/a5viI92PAF89q/giphy.gif"
				class="mb-4 w-full rounded-lg"
				alt=""
			/>
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
		</div>
	</div>
{/if}
