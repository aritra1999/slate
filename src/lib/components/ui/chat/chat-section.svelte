<script lang="ts">
	import { Paperclip, Send } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { selectedChatStore } from '$lib/store/chat.store';
	import MessageBubble from './message-bubble.svelte';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
	import ModelDetails from '$lib/components/ui/model-details/model-details.svelte';
</script>

{#if $selectedChatStore}
	<div class="flex-1 overflow-y-auto">chat section, your chats should show up here</div>
	<div class="flex-none py-4">
		<form class="rounded-3xl border-2 bg-sidebar p-2">
			<textarea
				class="w-full resize-none overflow-y-auto bg-transparent px-3 py-2.5 placeholder:text-muted-foreground focus:outline-0"
				placeholder="What's on your mind?"
				rows="3"
			></textarea>
			<div class="flex items-start justify-between">
				<div class="flex space-x-2">
					<ModelDetails />
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
{:else}
	<div>
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
