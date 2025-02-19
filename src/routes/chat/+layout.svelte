<script lang="ts">
	import AppSidebar from '$lib/components/ui/app-sidebar/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
			<Sidebar.Trigger class="-ml-1" />
		</header>
		{@render children?.()}
	</Sidebar.Inset>
</Sidebar.Provider>
