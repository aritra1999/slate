<script lang="ts">
	import { cn } from '$lib/utils';
	import { SquarePen } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import LocalChatForm from '$lib/components/ui/chat/local-chat-form.svelte';
</script>

<Dialog.Root open={true}>
	<Dialog.Trigger
		class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}
		aria-label="Start new chat"
	>
		<SquarePen />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New Chat</Dialog.Title>
		</Dialog.Header>
		<form action="">
			<Tabs.Root value="local">
				<Tabs.List class="grid w-full grid-cols-3">
					<Tabs.Trigger value="local">Local</Tabs.Trigger>
					<Tabs.Trigger value="self" disabled>Self-hosted</Tabs.Trigger>
					<Tabs.Trigger value="third" disabled>Third-party</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="local">
					<LocalChatForm />
				</Tabs.Content>
			</Tabs.Root>
		</form>
	</Dialog.Content>
</Dialog.Root>
