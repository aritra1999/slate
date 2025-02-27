<script lang="ts">
	import { cn } from '$lib/utils';
	import { EllipsisVertical } from 'lucide-svelte';
	import { modelStore } from '$lib/store/model.store';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
	import DeleteModelModal from '$lib/components/ui/model/model-delete-modal.svelte';
</script>

<Sidebar.MenuItem>
	<Sidebar.MenuButton class="font-medium">Models</Sidebar.MenuButton>
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
							<DropdownMenu.Root>
								<DropdownMenu.Trigger class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
									<EllipsisVertical class="size-4" />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Group>
										<DropdownMenu.GroupHeading>
											<DeleteModelModal {model} />
										</DropdownMenu.GroupHeading>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
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
					class={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'ml-2 px-6')}
					aria-label="Add Modal"
				>
					Add Modal
				</Dialog.Trigger>
			</Sidebar.MenuSubItem>
		</NewModel>
	</Sidebar.MenuSub>
</Sidebar.MenuItem>
