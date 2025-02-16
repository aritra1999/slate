<script lang="ts">
	import { Github } from 'lucide-svelte';
	import Logo from '$lib/components/ui/logo/logo.svelte';
</script>

<div class="flex h-screen items-center justify-center">
	<div>
		<div class="bg-secondary mb-4 flex border p-4">
			<div class="pr-8">
				<h1 class="mb-4 flex items-center text-xl font-semibold">
					<Logo />
					Slate
				</h1>
				<p class="text-muted-foreground mb-4">
					Open source chat UI for local,
					<br />
					self-hosted and cloud llms.
				</p>
				<a class="underline" target="_blank" href="https://github.com/aritra1999/slate">
					Want to contribute?
				</a>
			</div>
			<img
				src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGs5bTk2YWJ2dzliYXJyeGF6cjkycjk3NXEwZ2RpMjd1NGpwMzVvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W6A8UMnaJj8YbM9CQw/giphy.gif"
				class="h-40 w-40"
				alt=""
			/>
		</div>
	</div>
</div>
