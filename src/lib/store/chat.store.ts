import type { Chat } from '$lib/types';
import { writable } from 'svelte/store';

export const chatStore = writable<Chat[]>([]);
export const selectedChatStore = writable<string | null>(null);
