<script lang="ts">
	import { cn } from '$lib/utils';
	import { modelStore } from '$lib/store/model.store';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
</script>

<Sidebar.MenuItem>
	<Sidebar.MenuButton class="font-medium">Models</Sidebar.MenuButton>
	<Sidebar.MenuSub>
		{#if $modelStore.length > 0}
			{#each $modelStore as model}
				<Sidebar.MenuSubItem>
					<Sidebar.MenuSubButton>
						<div class="text-left">
							<div>{model.title}</div>
							<div class="ml-0.5 text-xs text-muted-foreground">
								{model.name}, {model.temperature}
							</div>
						</div>
					</Sidebar.MenuSubButton>
				</Sidebar.MenuSubItem>
			{/each}
		{:else}
			<Sidebar.MenuSubItem>
				<Sidebar.MenuSubButton>
					{#snippet child({ props })}
						<button {...props}>
							<div class="text-left">
								<div>No models</div>
							</div>
						</button>
					{/snippet}
				</Sidebar.MenuSubButton>
			</Sidebar.MenuSubItem>
		{/if}
		<NewModel>
			<Sidebar.MenuSubItem>
				<Dialog.Trigger
					class={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'ml-2 rounded-lg px-4')}
					aria-label="Start new chat"
				>
					Add Model
				</Dialog.Trigger>
			</Sidebar.MenuSubItem>
		</NewModel>
	</Sidebar.MenuSub>
</Sidebar.MenuItem>
