<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let validFormValues = $state(false);

	async function submitChatForm() {
		console.log('Adding new chat');
	}
</script>

<form action="" onsubmit={submitChatForm}>
	<Card.Root class="border-0 p-0 shadow-none">
		<Card.Header class="px-0">
			<Card.Title>Configure Local LLM</Card.Title>
			<Card.Description>
				Communicate with your local llms using ollama / lm studio (coming soon) / custom (coming
				soon).
			</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4 px-0">
			<div class="space-y-1">
				<Label for="system-prompt">System Prompt</Label>
				<Textarea id="system-prompt" name="system-prompt" class="h-24 resize-none" />
			</div>
		</Card.Content>
		<Card.Footer class="justify-end px-0">
			<Button class="w-40" type="submit" disabled={!validFormValues}>Start Chat</Button>
		</Card.Footer>
	</Card.Root>
</form>
