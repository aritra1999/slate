<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { MessageSquare, Bolt } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import Theme from '$lib/components/ui/app-sidebar/theme.svelte';
	import SidebarChat from '$lib/components/ui/app-sidebar/sidebar-chats.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import { cn } from '$lib/utils';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {...restProps}>
	<Sidebar.Header class="flex items-center justify-between border-b">
		<Logo />
		<NewChat>
			<Dialog.Trigger
				class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
				aria-label="Start new chat"
			>
				<MessageSquare />
			</Dialog.Trigger>
		</NewChat>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<SidebarChat />
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<a
			class="mb-0.5 rounded-lg bg-violet-700 bg-opacity-10 px-6 py-4 text-violet-500 no-underline"
			target="_blank"
			href="/feedback">Got feedback?</a
		>
		<div class="flex items-center space-x-2">
			<Button variant="secondary" href="/models" class="w-full rounded-lg no-underline">
				Models
			</Button>
			<div class="flex">
				<Button variant="secondary" size="icon" class="mr-2 rounded-lg">
					<Bolt />
				</Button>
				<Theme />
			</div>
		</div>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
