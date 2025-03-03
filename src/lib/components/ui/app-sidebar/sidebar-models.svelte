<script lang="ts">
	import { cn } from '$lib/utils';
	import { modelStore } from '$lib/store/model.store';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
	import DeleteModelModal from '$lib/components/ui/model/model-delete-modal.svelte';
</script>

<Sidebar.MenuItem>
	<div class="mb-4 flex items-center justify-between">
		<div class="pl-2 text-base font-medium">Models</div>
		<NewModel>
			<Sidebar.MenuSubItem>
				<Dialog.Trigger
					class={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4 py-1')}
					aria-label="Add Model"
				>
					Add Model
				</Dialog.Trigger>
			</Sidebar.MenuSubItem>
		</NewModel>
	</div>
	<Sidebar.MenuSub>
		{#if $modelStore.length > 0}
			{#each $modelStore as model}
				<Sidebar.MenuSubItem>
					<Sidebar.MenuSubButton>
						<div class="flex w-full items-center justify-between">
							<div class="w-full text-left">
								<div>{model.title}</div>
								<div class="ml-0.5 text-xs text-muted-foreground">
									{model.name}, {model.temperature}
								</div>
							</div>
							<DeleteModelModal {model} />
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
	</Sidebar.MenuSub>
</Sidebar.MenuItem>
