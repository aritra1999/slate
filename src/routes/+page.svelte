<script lang="ts">
	import Logo from '$lib/components/ui/logo/logo.svelte';
</script>

<div class="flex h-screen items-center justify-center px-4">
	<div>
		<div class="mb-4 flex flex-col-reverse border bg-secondary p-4 sm:flex-row">
			<div class="pr-8">
				<div class="mb-6">
					<Logo />
				</div>
				<p class="mb-5 text-muted-foreground">
					Open source chat UI for local,
					<br />
					self-hosted and cloud llms.
				</p>
				<div class="mb-3">
					<a href="/chat"> Chat </a>
				</div>
				<div class="mb-3">
					<a target="_blank" href="https://github.com/aritra1999/slate">Want to contribute?</a>
				</div>
				<div class="mb-3">
					<a target="_blank" href="/feedback">Got feedback?</a>
				</div>
			</div>
			<img
				src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGs5bTk2YWJ2dzliYXJyeGF6cjkycjk3NXEwZ2RpMjd1NGpwMzVvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W6A8UMnaJj8YbM9CQw/giphy.gif"
				class="mb-6 h-56 w-full object-cover object-center sm:mb-0 sm:w-40"
				alt="Animated coming soon illustration"
			/>
		</div>
	</div>
</div>
