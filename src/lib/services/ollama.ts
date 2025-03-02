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
	messages: Message[]
): Promise<Result<Message>> {
	try {
		const chatResponse = await ky
			.post(`${OLLAMA_API_URL}/api/chat`, {
				retry: 0,
				headers: {
					'content-type': 'application/json'
				},
				json: {
					model: modelName,
					messages: messages
				},
				referrerPolicy: 'strict-origin-when-cross-origin'
			})
			.json<{ message: Message }>();

		return ok(chatResponse.message);
	} catch (error) {
		return err(error);
	}
}
