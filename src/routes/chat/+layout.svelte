<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/ui/app-sidebar/app-sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset class="flex h-screen flex-col overflow-hidden">
		<header class="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
			<Sidebar.Trigger class="-ml-1" />
		</header>
		<div class="-mt-12 flex-1 overflow-hidden">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

<Toaster position="top-right" />
