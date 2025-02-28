import type { Model } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedModels = browser ? localStorage.getItem('models') : null;
const initialModels: Model[] = storedModels ? JSON.parse(storedModels) : [];

const store = writable<Model[]>(initialModels as Model[]);

export const modelStore = {
	subscribe: store.subscribe,
	set: (value: Model[]) => {
		localStorage.setItem('models', JSON.stringify(value));
		store.set(value);
	},
	update: (updater: (value: Model[]) => Model[]) => {
		store.update((value) => {
			const updatedValue = updater(value);
			if (browser) localStorage.setItem('models', JSON.stringify(updatedValue));
			return updatedValue;
		});
	}
};
