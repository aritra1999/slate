<script lang="ts">
	import Logo from '$lib/components/ui/logo/logo.svelte';
	import Theme from '$lib/components/ui/app-sidebar/theme.svelte';
	import BentoGrid from '$lib/components/ui/special/bento-grid.svelte';
	import BentoItem from '$lib/components/ui/special/bento-item.svelte';
	import SparklesText from '$lib/components/ui/special/sparkels-text.svelte';
	import Bot from 'lucide-svelte/icons/bot';
	import Lock from 'lucide-svelte/icons/lock';
	import MessageSquare from 'lucide-svelte/icons/message-square';
	import LogoIcon from '$lib/components/ui/logo/logo-icon.svelte';
	import { Button } from '$lib/components/ui/button';
	import DynamicImage from '$lib/components/ui/special/dynamic-image.svelte';
	import Github from 'lucide-svelte/icons/github';
	import Banana from 'lucide-svelte/icons/banana';

	const thumbnail = {
		light: 'https://ucarecdn.com/554d9dfb-a777-40d3-b7d8-c82c4a11a60a/-/preview/1000x583/',
		dark: 'https://ucarecdn.com/86430c0c-ddcd-40bd-8f3e-a6ece158c7e1/-/preview/1000x583/'
	};

	const features = [
		{
			icon: Github,
			description:
				'Fully open source and community-driven. Contribute, modify, and extend Slate to fit your specific needs.',
			feature: 'Open Source'
		},
		{
			icon: Bot,
			description:
				'Configure and use multiple models simultaneously, with customizable parameters like temperature.',
			feature: 'Multiple Model Support'
		},
		{
			icon: Banana,
			description: 'No need to run docker containers for the UI.',
			feature: 'Our UI'
		},
		{
			icon: Lock,
			description:
				'Keep your conversations and data private by running everything locally, with no data leaving your device.',
			feature: 'Privacy-Focused'
		}
	];
</script>

<main class="container mx-auto py-10 sm:py-24">
	<BentoGrid className="mb-4">
		<BentoItem className="col-span-1 sm:col-span-2 lg:col-span-1 sm:row-span-1 p-6">
			<div class="flex items-center gap-3">
				<LogoIcon />
				<SparklesText text="slate" />
			</div>
			<p class="mb-10 text-base text-muted-foreground">
				Our open source UI, your models.
				<br />
				Local, self-hosted and cloud llms.
			</p>
			<div>
				<Button variant="accent" size="lg" href="/chat" class="mr-2 rounded-lg px-6 no-underline">
					Chat
					<MessageSquare />
				</Button>
				<Button
					size="lg"
					target="_blank"
					href="https://github.com/aritra1999/slate"
					class="rounded-lg px-6 no-underline"
				>
					Contribute
					<Github />
				</Button>
			</div>
		</BentoItem>
		<BentoItem className="col-span-1 row-span-1 sm:col-span-2 sm:row-span-2 p-2">
			<DynamicImage images={thumbnail} />
		</BentoItem>
		<BentoItem className="col-span-1 row-span-2 p-2">
			<div class="flex h-full flex-col justify-evenly gap-2">
				{#each features as { icon: Icon, feature, description }}
					<div class=" h-full rounded-lg bg-background p-4">
						<h2 class="mb-3 flex items-center gap-4 text-sm font-semibold">
							<Icon class="size-5" />
							{feature}
						</h2>
						<p class="text-sm text-muted-foreground">{description}</p>
					</div>
				{/each}
			</div>
		</BentoItem>
		<BentoItem className="col-span-1 p-2">
			<div class="relative h-full w-full">
				<div class="absolute bottom-4 right-4 rounded-md bg-lime-300 px-4 py-2 text-neutral-900">
					Work In Progress 🚧
				</div>
				<img
					src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW83c2F3dzFuMDF5bGwwNGF3amViMngyMDVsd2pjY2d4cHh3MWtraCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZTans30ONaaIM/giphy.gif"
					class=" h-full w-full rounded-lg object-cover"
					alt=""
				/>
			</div>
		</BentoItem>
		<BentoItem className="col-span-1 p-6">
			<Logo />
			<div class="flex w-fit flex-col gap-2 px-1 py-2">
				<a class="no-underline hover:underline" href="/chat"> Chat </a>
				<a
					class="no-underline hover:underline"
					target="_blank"
					href="https://github.com/aritra1999/slate">Want to contribute?</a
				>
				<a class="no-underline hover:underline" target="_blank" href="/feedback">Got feedback?</a>
			</div>
			<div class="flex w-full items-center justify-between rounded-xl">
				<div class="flex items-center gap-8 text-sm text-muted-foreground">
					<p>&copy; 2025 Slate. All rights reserved.</p>
				</div>
				<Theme />
			</div>
		</BentoItem>
	</BentoGrid>
</main>
