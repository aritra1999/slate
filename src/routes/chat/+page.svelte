<script lang="ts">
	import { SendHorizontal } from 'lucide-svelte';
</script>

<div class="flex h-screen w-full flex-col">
	<div class="container mx-auto h-screen overflow-hidden py-2">
		<div class="h-[5%]">header</div>
		<div class="h-[85%]">chat section</div>
		<div class="h-[10%] border-2 px-1 sm:px-4">
			<form action="" class="flex h-full items-center">
				<textarea
					class="h-full w-full resize-none overflow-y-auto bg-transparent px-2 py-2.5 placeholder:text-muted-foreground focus:outline-0"
					placeholder="What's on your mind?"
				></textarea>
				<button class="mr-2 flex items-center justify-center rounded-sm bg-foreground p-2.5">
					<SendHorizontal class="size-5 text-white" />
				</button>
			</form>
		</div>
	</div>
</div>
