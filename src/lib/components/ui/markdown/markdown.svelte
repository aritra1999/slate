<script lang="ts">
	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import python from 'highlight.js/lib/languages/python';
	import css from 'highlight.js/lib/languages/css';
	import xml from 'highlight.js/lib/languages/xml';
	import bash from 'highlight.js/lib/languages/bash';
	import cpp from 'highlight.js/lib/languages/cpp';
	import json from 'highlight.js/lib/languages/json';
	import rust from 'highlight.js/lib/languages/rust';
	import go from 'highlight.js/lib/languages/go';
	import 'highlight.js/styles/github-dark.css';

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('ts', typescript);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('py', python);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('html', xml);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('sh', bash);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('cpp', cpp);
	hljs.registerLanguage('golang', go);
	hljs.registerLanguage('go', go);
	hljs.registerLanguage('rust', rust);

	let { content = '' } = $props();
	let sanitizedHtml = $state('');
	let markdownElement: HTMLDivElement;

	marked.setOptions({
		gfm: true,
		breaks: true,
		highlight: function (code: string, lang: string) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(code, { language: lang }).value;
				} catch (e) {
					console.error('Highlight error:', e);
				}
			}
			return code;
		}
	});

	const purifyConfig = {
		ADD_ATTR: ['target'],
		FORBID_TAGS: ['style', 'script'],
		FORBID_ATTR: ['onerror', 'onload']
	};

	async function renderMarkdown() {
		if (!content) return;

		try {
			const rawHtml = await marked.parse(content.toString());
			sanitizedHtml = DOMPurify.sanitize(rawHtml, purifyConfig);
		} catch (error) {
			console.error('Error rendering markdown:', error);
			sanitizedHtml = `<p>Error rendering content</p>`;
		}
	}

	function ensureHighlighting() {
		if (!markdownElement) return;

		const codeBlocks = markdownElement.querySelectorAll('pre code');
		codeBlocks.forEach((block: Element) => {
			// Only process blocks that haven't been highlighted yet
			if (!block.classList.contains('hljs')) {
				hljs.highlightElement(block as HTMLElement);
			}
		});
	}

	$effect(() => {
		if (content) {
			renderMarkdown();
		}
	});

	$effect(() => {
		if (sanitizedHtml) {
			setTimeout(ensureHighlighting, 0);
		}
	});

	onMount(() => {
		renderMarkdown();
	});
</script>

<div class="markdown prose prose-slate dark:prose-invert max-w-none" bind:this={markdownElement}>
	{@html sanitizedHtml}
</div>

<style>
	.markdown :global(pre) {
		padding: 1rem;
		border-radius: 0.5rem;
		margin: 1rem 0;
		overflow-x: auto;
		background-color: #0d1117;
		color: #ffffff;
	}

	.markdown :global(code) {
		font-family: 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-optical-sizing: auto;
		font-weight: 400;
		font-style: normal;
		font-size: 0.9em;
	}

	.markdown :global(:not(pre) > code) {
		padding: 0.2em 0.4em;
		margin: 0;
		background-color: rgba(175, 184, 193, 0.2);
		border-radius: 0.25rem;
	}

	.markdown :global(pre code) {
		background-color: transparent;
		padding: 0;
		border-radius: 0;
	}

	.markdown :global(a) {
		color: #1a7afa;
		text-decoration: underline;
	}

	.markdown :global(ul),
	.markdown :global(ol) {
		padding-left: 1.5em;
		margin: 1em 0;
	}

	.markdown :global(blockquote) {
		border-left: 4px solid #d1d5db;
		padding-left: 1rem;
		color: #6b7280;
		margin: 1.5em 0;
	}

	.markdown :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 1.5em 0;
	}

	.markdown :global(th),
	.markdown :global(td) {
		border: 1px solid #d1d5db;
		padding: 0.5em;
	}

	.markdown :global(th) {
		background-color: rgba(243, 244, 246, 0.6);
	}

	:global(.dark) .markdown :global(blockquote) {
		border-left-color: #4b5563;
		color: #9ca3af;
	}

	:global(.dark) .markdown :global(th),
	:global(.dark) .markdown :global(td) {
		border-color: #374151;
	}

	:global(.dark) .markdown :global(th) {
		background-color: rgba(31, 41, 55, 0.6);
	}

	:global(.dark) .markdown :global(:not(pre) > code) {
		background-color: rgba(99, 110, 123, 0.2);
	}
</style>
