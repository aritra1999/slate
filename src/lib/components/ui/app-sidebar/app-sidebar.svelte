<script lang="ts">
	import { Bolt } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import Theme from '$lib/components/ui/app-sidebar/theme.svelte';
	import SidebarChat from '$lib/components/ui/app-sidebar/sidebar-chats.svelte';
</script>

<Sidebar.Root>
	<Sidebar.Header class="justify-between">
		<Logo />
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
</Sidebar.Root>
