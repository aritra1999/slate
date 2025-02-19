export type Result<T> = { success: true; value: T } | { success: false; error: Error };

export function ok<T>(value: T): Result<T> {
	return { success: true, value };
}

export function err(error: unknown): Result<never> {
	if (error instanceof Error) {
		return { success: false, error };
	}

	if (typeof error === 'string') {
		return { success: false, error: new Error(error) };
	}

	try {
		const stringified = JSON.stringify(error);
		return { success: false, error: new Error(stringified) };
	} catch {
		return { success: false, error: new Error('An error occurred') };
	}
}
