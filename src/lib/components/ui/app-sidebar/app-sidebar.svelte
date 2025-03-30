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
		<div>
			<Sidebar.Group>
				<SidebarChat />
			</Sidebar.Group>
		</div>
	</Sidebar.Content>
	<Sidebar.Footer>
		<a
			class="mb-2 rounded-2xl bg-violet-700 bg-opacity-10 px-6 py-4 text-violet-400 no-underline"
			target="_blank"
			href="/feedback">Got feedback?</a
		>
		<div class="flex items-center space-x-4">
			<Button variant="secondary" class="w-full">
				<Bolt class="mr-2" />
				Settings
			</Button>
			<Theme />
		</div>
	</Sidebar.Footer>
</Sidebar.Root>
