<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { z } from 'zod';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { OLLAMA_SETUP_DOCS } from '$lib/config';
	import { getOllamaModels } from '$lib/services/ollama';
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	import Loading from '$lib/components/ui/loading/loading.svelte';
	import { modelStore } from '$lib/store/model.store';

	const modelFormSchema = z.object({
		title: z.string().min(1, 'Title is required'),
		name: z.string().min(1, 'Model name is required'),
		temperature: z.number().min(0).max(1)
	});

	type ModelFormData = z.infer<typeof modelFormSchema>;

	let loadingModels = $state(false);
	let errorLoadingModels = $state('');
	let validFormValues = $state(false);
	let formErrors = $state<Record<string, string>>({});
	let availableModelOptions = $state<{ value: string; label: string }[]>([]);
	let selectedModelOption = $state<{ value: string; label: string } | undefined>(undefined);
	let formData = $state<ModelFormData>({
		title: '',
		name: '',
		temperature: 0.7
	});

	let localServiceOptions = [
		{ value: 'ollama', label: 'Ollama', disabled: false, comingSoon: false },
		{ value: 'lmstudio', label: 'LM Studio', disabled: true, comingSoon: true },
		{ value: 'custom', label: 'Custom', disabled: true, comingSoon: true }
	];
	let selectedLocalServiceOption = $state(localServiceOptions[0]);

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
		if (selectedModelOption) {
			formData.name = selectedModelOption.value;
		}
	}

	function validateForm() {
		try {
			modelFormSchema.parse(formData);
			formErrors = {};
			validFormValues = true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				formErrors = error.errors.reduce(
					(acc, curr) => {
						const field = curr.path[0] as string;
						acc[field] = curr.message;
						return acc;
					},
					{} as Record<string, string>
				);
			}
			validFormValues = false;
		}
	}

	function handleSubmit(e: Event) {
		e.preventDefault();

		try {
			const validatedData = modelFormSchema.parse(formData);

			const newModel = {
				id: crypto.randomUUID(),
				title: validatedData.title,
				name: validatedData.name,
				temperature: validatedData.temperature,
				source: 'local' as const
			};

			modelStore.update((models) => [...models, newModel]);

			formData = {
				title: '',
				name: selectedModelOption?.value || '',
				temperature: 0.7
			};

			alert('Model added successfully!');
		} catch (error) {
			if (error instanceof z.ZodError) {
				validateForm();
			}
		}
	}

	$effect(() => {
		validateForm();
	});

	$effect(() => {
		updateModels();
	});

	$effect(() => {
		if (selectedModelOption) {
			formData.name = selectedModelOption.value;
		}
	});
</script>

<form action="" onsubmit={handleSubmit}>
	<Card.Root class="border-0 p-0 shadow-none">
		<Card.Header class="px-0">
			<Card.Description>
				Configure your local llms using ollama / lm studio (coming soon) / custom (coming soon).
			</Card.Description>
		</Card.Header>
		<Card.Content class="space-y-4 px-0">
			<div class="space-y-1">
				<Label for="service-name">Source</Label>
				<Tabs.Root value="local">
					<Tabs.List class="grid w-full grid-cols-3">
						<Tabs.Trigger value="local">Local</Tabs.Trigger>
						<Tabs.Trigger value="self" disabled>Self-hosted</Tabs.Trigger>
						<Tabs.Trigger value="third" disabled>Third-party</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="local"></Tabs.Content>
				</Tabs.Root>
			</div>
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
							Please refer to the
							<a href={OLLAMA_SETUP_DOCS} target="_blank"> documentation </a> on how to configure ollama
							locally.
						</p>
					</Alert.Description>
				</Alert.Root>
			{:else if availableModelOptions.length === 0}
				<Alert.Root>
					<CircleAlert class="size-4" />
					<Alert.Description>
						<p>No models available</p>
						<p>
							Please refer to the
							<a href={OLLAMA_SETUP_DOCS} target="_blank">documentation</a> on how to configure ollama
							locally.
						</p>
					</Alert.Description>
				</Alert.Root>
			{:else}
				<div class="space-y-1">
					{#if selectedModelOption}
						<Label for="model-name">Model</Label>
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
					<Input id="title" type="text" bind:value={formData.title} />
					{#if formErrors.title}
						<p class="text-sm text-red-500">{formErrors.title}</p>
					{/if}
				</div>
				<div class="space-y-1">
					<Label for="temperature">Temperature</Label>
					<Input
						id="temperature"
						type="number"
						step="0.1"
						min="0"
						max="1"
						bind:value={formData.temperature}
					/>
					{#if formErrors.temperature}
						<p class="text-sm text-red-500">{formErrors.temperature}</p>
					{/if}
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="justify-end px-0">
			<Button class="w-40" type="submit" disabled={!validFormValues}>Add Model</Button>
		</Card.Footer>
	</Card.Root>
</form>
