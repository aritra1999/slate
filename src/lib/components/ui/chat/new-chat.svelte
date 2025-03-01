<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import LocalChatForm from '$lib/components/ui/chat/chat-form.svelte';
	import { metaStore } from '$lib/store/meta.store';

	let { children } = $props();
</script>

<Dialog.Root bind:open={$metaStore.showChatForm}>
	{@render children()}
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New Chat</Dialog.Title>
		</Dialog.Header>
		<form action="">
			<LocalChatForm />
		</form>
	</Dialog.Content>
</Dialog.Root>
