import { err, ok, type Result } from '$lib/error';
import type { OllamaModel } from '$lib/types';
import ky from 'ky';

export async function getOllamaModels(): Promise<Result<OllamaModel[]>> {
	try {
		const modelsResponse = await ky
			.get(`http://localhost:11434/api/tags`, {
				retry: 0
			})
			.json<{ models: OllamaModel[] }>();
		return ok(modelsResponse.models);
	} catch (error) {
		return err(error);
	}
}
