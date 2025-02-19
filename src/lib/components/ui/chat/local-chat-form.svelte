<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import Loading from '$lib/components/ui/loading/loading.svelte';
	import { getOllamaModels } from '$lib/services/ollama';

	let loadingModels = $state(false);
	let errorLoadingModels = $state('');
	let validFormValues = $state(false);
	let availableModelOptions = $state<{ value: string; label: string }[]>([]);
	let selectedModelOption = $state<{ value: string; label: string } | undefined>(undefined);

	let localServiceOptions = [
		{ value: 'ollama', label: 'Ollama', disabled: false, comingSoon: false },
		{ value: 'lmstudio', label: 'LM Studio', disabled: true, comingSoon: true },
		{ value: 'custom', label: 'Custom', disabled: true, comingSoon: true }
	];
	let selectedLocalServiceOption = $state(localServiceOptions[0]);

	$effect(() => {
		updateModels();
	});

	async function updateModels() {
		loadingModels = true;

		switch (selectedLocalServiceOption.value) {
			case 'ollama':
				await updateOllamaModels();
				break;
			case 'lmstudio':
				break;
			case 'custom':
				break;
		}

		loadingModels = false;
	}

	async function updateOllamaModels() {
		const modelsResults = await getOllamaModels();
		if (!modelsResults.success) {
			errorLoadingModels =
				'Error loading local ollama models, make sure if you have ollama configured properly!';
			return;
		}

		availableModelOptions = modelsResults.value.map((models) => ({
			label: models.name,
			value: models.name
		}));

		selectedModelOption = availableModelOptions[0];
	}

	async function startNewChat() {
		console.log('Adding new chat');
	}
</script>

<form action="" onsubmit={startNewChat}>
	<Card.Root class="border-0 p-0 shadow-none">
		<Card.Header class="px-0">
			<Card.Title>Configure Local LLM</Card.Title>
			<Card.Description>
				Communicate with your local llms using ollama / lm studio (coming soon) / custom (coming
				soon).
			</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4 px-0">
			<div class="space-y-1">
				<Label for="service-name">Service</Label>
				<Select.Root type="single" bind:value={selectedLocalServiceOption.value}>
					<Select.Trigger>
						{selectedLocalServiceOption.label}
					</Select.Trigger>
					<Select.Content>
						{#each localServiceOptions as { label, value, disabled, comingSoon }}
							<Select.Item {value} {disabled}>
								{label}
								{#if comingSoon}
									(coming soon)
								{/if}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			{#if loadingModels}
				<div class="w-full py-4">
					<Loading message={'Loading models'} />
				</div>
			{:else if errorLoadingModels}
				<Alert.Root variant="destructive">
					<CircleAlert class="size-4" />
					<Alert.Description>
						<p>{errorLoadingModels}</p>
						<p>
							Please refer to the <a href="/docs">documentation</a> on how to configure ollama locally.
						</p>
					</Alert.Description>
				</Alert.Root>
			{:else}
				<div class="space-y-1">
					<Label for="model-name">Service</Label>
					{#if selectedModelOption}
						<Select.Root type="single" bind:value={selectedModelOption.value}>
							<Select.Trigger>
								{selectedModelOption.label}
							</Select.Trigger>
							<Select.Content>
								{#each availableModelOptions as { label, value }}
									<Select.Item {value}>{label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					{/if}
				</div>
				<div class="space-y-1">
					<Label for="title">Title</Label>
					<Input id="title" />
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="justify-end px-0">
			<Button class="w-40" type="submit" disabled={!validFormValues}>Start New Chat</Button>
		</Card.Footer>
	</Card.Root>
</form>
