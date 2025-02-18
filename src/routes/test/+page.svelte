<script lang="ts">
	import OpenAI from 'openai';

	async function chat() {
		const openai = new OpenAI({
			baseURL: 'http://localhost:11434/v1/',
			dangerouslyAllowBrowser: true,
			apiKey: 'ollama'
		});

		const chatCompletion = await openai.chat.completions.create({
			messages: [{ role: 'user', content: 'Say this is a test' }],
			model: 'deepseek-r1:1.5b'
		});

		console.log(chatCompletion);
	}
</script>

<div class="flex h-screen items-center justify-center px-4">
	<div class=" flex flex-col bg-secondary p-4">
		<form action="" onsubmit={chat}>
			<button type="submit">send</button>
		</form>
	</div>
</div>
