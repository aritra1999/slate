import { OLLAMA_API_URL } from '$lib/config';
import { err, ok, type Result } from '$lib/error';
import type { OllamaModel } from '$lib/types';
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
