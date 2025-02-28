import { writable } from 'svelte/store';

export const metaStore = writable({
	showModelForm: false,
	showChatForm: false
});
