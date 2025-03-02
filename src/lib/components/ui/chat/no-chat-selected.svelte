<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
</script>

<div class="flex h-full items-center justify-center p-4">
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
