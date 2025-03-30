<script lang="ts">
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { modelStore } from '$lib/store/model.store';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import NewModel from '$lib/components/ui/model/new-model.svelte';
	import DeleteModelModal from '$lib/components/ui/model/model-delete-modal.svelte';
	import { BotMessageSquare, Thermometer } from 'lucide-svelte';
</script>

<div class="container py-20">
	<div class="items-center mb-10 flex justify-between">
		<h1 class="text-xl font-semibold">Models</h1>
		<NewModel>
			<Dialog.Trigger
				class={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4 py-1')}
				aria-label="Add Model"
			>
				Add Model
			</Dialog.Trigger>
		</NewModel>
	</div>
	<div>
		{#if $modelStore.length > 0}
			<div class="grid gap-4 sm:grid-cols-3">
				{#each $modelStore as model}
					<div class="w-full rounded-xl border-2 p-4 hover:border-foreground">
						<div class="mb-3 flex items-center justify-between text-lg">
							{model.title}
							<DeleteModelModal {model} />
						</div>
						<div class="flex gap-2">
							<div class="flex w-fit items-center rounded-sm bg-secondary px-3 py-1">
								<BotMessageSquare class="mr-3 size-4" />
								{model.name}
							</div>
							<div class="flex w-fit items-center rounded-sm bg-secondary px-3 py-1">
								<Thermometer class="mr-2 size-4" />
								{model.temperature}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="flex justify-center rounded-lg bg-secondary py-20">No models</div>
		{/if}
	</div>
</div>
