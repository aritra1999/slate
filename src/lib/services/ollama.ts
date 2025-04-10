import { OLLAMA_API_URL } from '$lib/config';
import { err, ok, type Result } from '$lib/error';
import type { Message, OllamaModel } from '$lib/types';
import ky from 'ky';

export async function getOllamaModels(): Promise<Result<OllamaModel[]>> {
	try {
		const modelsResponse = await ky
			.get(`${OLLAMA_API_URL}/api/tags`, {
				retry: 0,
				headers: {
					'content-type': 'application/json'
				},
				referrerPolicy: 'strict-origin-when-cross-origin'
			})
			.json<{ models: OllamaModel[] }>();
		return ok(modelsResponse.models);
	} catch (error) {
		return err(error);
	}
}

export async function communicateToOllamaModel(
	modelName: string,
	messages: Message[],
	onUpdate?: (partialMessage: string) => void
): Promise<Result<Message>> {
	try {
		const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: modelName,
				messages: messages,
				stream: true
			})
		});

		if (!response.ok || !response.body) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let fullContent = '';

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			for (const line of chunk.split('\n').filter(Boolean)) {
				try {
					const parsed = JSON.parse(line);
					if (parsed.message?.content) {
						fullContent += parsed.message.content;
						onUpdate?.(fullContent);
					}
				} catch (e) {
					console.error('Error parsing JSON:', e);
				}
			}
		}

		return ok({ role: 'assistant', content: fullContent });
	} catch (error) {
		return err(error);
	}
}
