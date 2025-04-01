<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';
	import posthog from 'posthog-js';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { PUBLIC_POSTHOG_TOKEN } from '$env/static/public';

	let { children } = $props();

	type PathMapping = {
		[key: string]: string;
	};

	const titles: PathMapping = {
		'/': 'Slate: One UI for all LLMs | Open Source AI Chat Interface',
		'/chat': 'Chat with AI Models | Slate',
		'/models': 'Configure Your AI Models | Slate',
		'/feedback': 'Provide Feedback | Slate'
	};

	const descriptions: PathMapping = {
		'/': 'Community maintained open source UI for local, self-hosted and cloud-hosted large language models. Chat with AI while keeping your data private.',
		'/chat':
			"Chat with your configured AI models using Slate's intuitive interface. Keep your conversations private with local processing.",
		'/models':
			'Configure and manage multiple AI models in one place. Customize parameters like temperature for optimal responses.',
		'/feedback':
			'Help improve Slate by providing your feedback. Your input shapes the future of this open source project.'
	};

	let currentPath = $state('/');
	let pageTitle = $derived(titles[currentPath] || 'Slate: One UI for all LLMs');
	let pageDescription = $derived(
		descriptions[currentPath] || 'Community maintained open source UI for all LLMs.'
	);

	$effect(() => {
		if ($navigating) {
			currentPath = $navigating.to?.url.pathname || '/';
		}
	});

	onMount(() => {
		if (browser) {
			currentPath = window.location.pathname;
			posthog.init(PUBLIC_POSTHOG_TOKEN, {
				api_host: 'https://eu.i.posthog.com',
				person_profiles: 'always'
			});
		}
		return;
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={pageDescription} />
</svelte:head>

<ModeWatcher />
<main>
	{@render children()}
</main>
