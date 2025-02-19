<script lang="ts">
	import { Bolt } from 'lucide-svelte';
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import NewChat from '$lib/components/ui/chat/new-chat.svelte';
	import Theme from '$lib/components/ui/app-sidebar/theme.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
</script>

<Sidebar.Root>
	<Sidebar.Header class="justify-between">
		<Logo />
		<NewChat />
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group />
		<Sidebar.Group />
	</Sidebar.Content>
	<Sidebar.Footer>
		<div class="flex items-center space-x-4">
			<Button variant="secondary" class="w-full">
				<Bolt class="mr-2" />
				Settings
			</Button>
			<Theme />
		</div>
	</Sidebar.Footer>
</Sidebar.Root>
