import type { Chat } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import posthog from 'posthog-js';

const storedChats = browser ? localStorage.getItem('chats') : null;

const initialChats: Map<string, Chat> = storedChats
	? new Map(Object.entries(JSON.parse(storedChats)))
	: new Map();

const storedSelectedChat = browser ? localStorage.getItem('selectedChat') : null;
const initialSelectedChat: string | null = storedSelectedChat || null;

const chats = writable<Map<string, Chat>>(initialChats);
const selectedChat = writable<string | null>(initialSelectedChat);

export const chatStore = {
	subscribe: chats.subscribe,
	set(value: Map<string, Chat>) {
		if (browser) {
			localStorage.setItem('chats', JSON.stringify(Object.fromEntries(value)));
			posthog.capture('chat_created');
		}
		chats.set(value);
	},
	update(updater: (value: Map<string, Chat>) => Map<string, Chat>) {
		chats.update((value) => {
			const updated = updater(value);
			if (browser) {
				localStorage.setItem('chats', JSON.stringify(Object.fromEntries(updated)));
			}
			return updated;
		});
	},
	getChat(id: string) {
		let chat;
		chats.subscribe((map) => {
			chat = map.get(id);
		})();
		return chat;
	}
};

export const selectedChatStore = {
	subscribe: selectedChat.subscribe,
	set: (value: string | null) => {
		if (browser) {
			if (value) {
				localStorage.setItem('selectedChat', value);
			} else {
				localStorage.removeItem('selectedChat');
			}
		}
		selectedChat.set(value);
	},
	update: (updater: (value: string | null) => string | null) => {
		selectedChat.update((value) => {
			const updatedValue = updater(value);
			if (browser) {
				if (updatedValue) {
					localStorage.setItem('selectedChat', updatedValue);
				} else {
					localStorage.removeItem('selectedChat');
				}
			}
			return updatedValue;
		});
	}
};
