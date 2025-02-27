<script lang="ts">
	import type { Model } from '$lib/types';
	import { modelStore } from '$lib/store/model.store';
	import { buttonVariants } from '../button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	let { model }: { model: Model } = $props();

	async function deleteModel() {
		modelStore.update((models: Model[]) => models.filter((m) => m.id !== model.id));
	}
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger>Delete</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>
				Are you absolutely sure you want to delete {model.title}?
			</AlertDialog.Title>
			<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action class={buttonVariants({ variant: 'destructive' })} onclick={deleteModel}>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
