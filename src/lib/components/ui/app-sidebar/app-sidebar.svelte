<script lang="ts">
	import { Bolt } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import Theme from '$lib/components/ui/app-sidebar/theme.svelte';
	import SidebarChat from '$lib/components/ui/app-sidebar/sidebar-chats.svelte';
	import SidebarModels from '$lib/components/ui/app-sidebar/sidebar-models.svelte';
</script>

<Sidebar.Root>
	<Sidebar.Header class="justify-between">
		<Logo />
	</Sidebar.Header>
	<Sidebar.Separator class="mb-4" />
	<Sidebar.Content class="h-full">
		<Sidebar.Group class="h-2/3">
			<Sidebar.Menu>
				<SidebarChat />
			</Sidebar.Menu>
		</Sidebar.Group>
		<Sidebar.Separator class="mb-4" />
		<Sidebar.Group class="h-1/3">
			<Sidebar.Menu>
				<SidebarModels />
			</Sidebar.Menu>
		</Sidebar.Group>
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
