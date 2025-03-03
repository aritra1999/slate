<script lang="ts">
	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	let { content = '' } = $props();
	let sanitizedHtml = $state('');

	marked.use(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang) {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(code, { language: lang }).value;
					} catch (err) {
						console.error('Highlight error:', err);
					}
				}
				return hljs.highlightAuto(code).value;
			}
		})
	);

	marked.use({
		breaks: true,
		gfm: true
	});

	function renderMarkdown() {
		try {
			const rawHtml = marked.parse(content) as string;
			sanitizedHtml = DOMPurify.sanitize(rawHtml);
		} catch (error) {
			console.error('Error rendering markdown:', error);
			sanitizedHtml = `<p>Error rendering content</p>`;
		}
	}

	$effect(() => {
		renderMarkdown();
	});

	onMount(() => {
		renderMarkdown();
	});
</script>

<div class="markdown prose prose-slate dark:prose-invert max-w-none">
	{@html sanitizedHtml}
</div>

<style>
	.markdown :global(pre) {
		padding: 1rem;
		border-radius: 0.5rem;
		margin: 1rem 0;
		overflow-x: auto;
		background-color: #0d1117;
	}

	.markdown :global(code) {
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
			monospace;
		font-size: 0.875em;
	}

	.markdown :global(p code) {
		padding: 0.2em 0.4em;
		margin: 0;
		background-color: rgba(175, 184, 193, 0.2);
		border-radius: 0.25rem;
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

	:global(.dark) .markdown :global(p code) {
		background-color: rgba(99, 110, 123, 0.2);
	}
</style>
