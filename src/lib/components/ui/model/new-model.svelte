<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { metaStore } from '$lib/store/meta.store';
	import ModelForm from '$lib/components/ui/model/model-form.svelte';

	let { children } = $props();
</script>

<Dialog.Root bind:open={$metaStore.showModelForm}>
	{@render children()}
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New Model</Dialog.Title>
		</Dialog.Header>
		<form action="">
			<ModelForm />
		</form>
	</Dialog.Content>
</Dialog.Root>
