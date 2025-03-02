<script lang="ts">
	import { onMount } from 'svelte';
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';
	import { modelStore } from '$lib/store/model.store';
	import { chatStore, selectedChatStore } from '$lib/store/chat.store';
	import { metaStore } from '$lib/store/meta.store';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { CircleAlert } from 'lucide-svelte';
	import type { Role } from '$lib/types';

	const chatFormSchema = z.object({
		title: z.string().min(1, 'Title is required'),
		modelId: z.string().min(1, 'Model is required'),
		systemPrompt: z.string().optional(),
		stream: z.boolean().optional()
	});

	type ChatFormData = z.infer<typeof chatFormSchema>;

	let modelOptions = $state<{ value: string; label: string }[]>();
	let selectedModel = $state<{ value: string; label: string } | undefined>(undefined);
	let formErrors = $state<Record<string, string>>({});
	let formData = $state<ChatFormData>({
		title: '',
		modelId: '',
		systemPrompt: '',
		stream: true
	});

	function validateForm() {
		try {
			chatFormSchema.parse(formData);
			formErrors = {};
			return true;
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
			return false;
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		formData.modelId = selectedModel?.value || '';

		if (!validateForm()) {
			return;
		}

		const model = $modelStore.find((m) => m.id === formData.modelId);
		if (!model) {
			formErrors.modelId = 'Invalid model selected';
			return;
		}

		const messages = formData.systemPrompt
			? [{ role: 'system' as Role, content: formData.systemPrompt }]
			: [];

		const newChat = {
			id: crypto.randomUUID(),
			title: formData.title,
			model: model,
			stream: formData.stream ?? true,
			createdAt: new Date(),
			updatedAt: new Date(),
			messages
		};

		chatStore.update((chats) => {
			const newChats = new Map(chats);
			newChats.set(newChat.id, newChat);
			return newChats;
		});

		selectedChatStore.set(newChat.id);
		$metaStore.showChatForm = false;

		toast.success(`New chat "${formData.title}" created`);
	}

	onMount(() => {
		if ($modelStore.length > 0) {
			modelOptions = $modelStore.map((model) => ({
				value: model.id,
				label: `${model.title} (${model.name}, ${model.temperature})`
			}));
			selectedModel = modelOptions[0];
			if (selectedModel) {
				formData.modelId = selectedModel.value;
			}
		}
	});
</script>

<form action="" onsubmit={handleSubmit}>
	<Card.Root class="border-0 p-0 shadow-none">
		<Card.Content class="space-y-4 px-0">
			<div class="space-y-1">
				<Label for="model-name" required={true}>Model</Label>
				{#if $modelStore.length > 0}
					{#if selectedModel && modelOptions}
						<Select.Root
							type="single"
							value={selectedModel.value}
							onValueChange={(newValue: string) => {
								if (modelOptions) {
									selectedModel = modelOptions.find((option) => option.value === newValue);
									if (selectedModel) {
										formData.modelId = selectedModel.value;
									}
								}
							}}
						>
							<Select.Trigger>
								{selectedModel.label}
							</Select.Trigger>
							<Select.Content>
								{#each modelOptions as { label, value }}
									<Select.Item {value}>{label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						{#if formErrors.modelId}
							<p class="text-sm text-red-500">{formErrors.modelId}</p>
						{/if}
					{/if}
				{:else}
					<Alert.Root variant="destructive">
						<CircleAlert class="size-4" />
						<Alert.Description>
							<p>No models available</p>
							<p>Please add a model first!</p>
						</Alert.Description>
					</Alert.Root>
				{/if}
			</div>
			<div class="space-y-1">
				<Label for="title" required={true}>Title</Label>
				<Input
					id="title"
					type="text"
					bind:value={formData.title}
					placeholder="Give your chat a title"
				/>
				{#if formErrors.title}
					<p class="text-sm text-red-500">{formErrors.title}</p>
				{/if}
			</div>
			<div class="space-y-1">
				<Label for="system-prompt">System Prompt</Label>
				<Textarea
					id="system-prompt"
					name="system-prompt"
					class="h-36 resize-none"
					bind:value={formData.systemPrompt}
					placeholder="Optional instructions to set the behavior of the assistant"
				/>
				{#if formErrors.systemPrompt}
					<p class="text-sm text-red-500">{formErrors.systemPrompt}</p>
				{/if}
			</div>
			<div class="flex items-center space-x-2">
				<Checkbox
					id="stream"
					checked={formData.stream}
					onCheckedChange={(checked) => {
						formData.stream = checked === true;
					}}
				/>
				<Label for="stream" class="text-sm font-normal">Enable streaming responses</Label>
			</div>
		</Card.Content>
		<Card.Footer class="justify-end px-0">
			<Button class="w-40" type="submit" disabled={$modelStore.length === 0}>Start Chat</Button>
		</Card.Footer>
	</Card.Root>
</form>
