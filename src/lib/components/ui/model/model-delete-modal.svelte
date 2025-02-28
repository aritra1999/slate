<script lang="ts">
	import { Trash } from 'lucide-svelte';
	import type { Model } from '$lib/types';
	import { modelStore } from '$lib/store/model.store';
	import { buttonVariants } from '../button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	let { model }: { model: Model } = $props();
	let open = $state(false);

	async function deleteModel() {
		modelStore.update((models: Model[]) => models.filter((m) => m.id !== model.id));
		open = false;
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Trigger>
		<Trash class="size-4 hover:text-red-400" />
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>
				Are you absolutely sure you want to delete {model.title}?
			</AlertDialog.Title>
			<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action class={buttonVariants({ variant: 'destructive' })} onclick={deleteModel}>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
