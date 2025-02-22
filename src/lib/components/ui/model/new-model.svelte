<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ModelForm from '$lib/components/ui/model/model-form.svelte';

	let { children } = $props();
</script>

<Dialog.Root>
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
