<script lang="ts">
	import { Paperclip, Send } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';
	import MessageBubble from './message-bubble.svelte';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
	import ModelDetails from '$lib/components/ui/model-details/model-details.svelte';

	let selectedChat = $derived($chatStore.find((chat) => chat.id === $selectedChatStore));
</script>

{#if selectedChat}
	<div class="container flex h-full flex-col overflow-hidden">
		<!-- Title fixed at the top -->
		<div class="flex-none border-b px-4 pb-4">
			<h2 class="text-xl font-semibold">{selectedChat.title}</h2>
		</div>

		<div class="flex-1 overflow-y-auto p-4">Chat goes here</div>

		<div class="flex-none p-4">
			<form class="rounded-3xl border-2 bg-sidebar p-2">
				<textarea
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
					<Button class="rounded-2xl" size="icon">
						<Send />
					</Button>
				</div>
			</form>
		</div>
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
