<script lang="ts">
	import { Paperclip, Send } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import ModelDetails from '$lib/components/ui/model-details/model-details.svelte';
</script>

<div class="flex h-full w-full flex-col">
	<div class="container mx-auto flex h-full flex-col">
		<div class="flex-1 overflow-y-auto">chat section</div>
		<div class="flex-none py-4">
			<form class="rounded-3xl border-2 bg-sidebar p-2">
				<textarea
					class="w-full resize-none overflow-y-auto bg-transparent px-3 py-2.5 placeholder:text-muted-foreground focus:outline-0"
					placeholder="What's on your mind?"
					rows="3"
				></textarea>
				<div class="flex items-start justify-between">
					<div class="flex space-x-2">
						<ModelDetails />
						<Button class="rounded-2xl" size="icon" disabled>
							<Paperclip />
						</Button>
					</div>
					<Button class="rounded-2xl" size="icon">
						<Send />
					</Button>
				</div>
			</form>
		</div>
	</div>
</div>
