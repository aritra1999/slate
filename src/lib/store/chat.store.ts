import type { Chat } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

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
	set: (value: Map<string, Chat>) => {
		if (browser) {
			const chatsObject = Object.fromEntries(value);
			localStorage.setItem('chats', JSON.stringify(chatsObject));
		}
		chats.set(value);
	},
	update: (updater: (value: Map<string, Chat>) => Map<string, Chat>) => {
		chats.update((value) => {
			const updatedValue = updater(value);
			if (browser) {
				const chatsObject = Object.fromEntries(updatedValue);
				localStorage.setItem('chats', JSON.stringify(chatsObject));
			}
			return updatedValue;
		});
	},
	addChat: (chat: Chat) => {
		chats.update((map) => {
			const newMap = new Map(map);
			newMap.set(chat.id, chat);
			if (browser) {
				const chatsObject = Object.fromEntries(newMap);
				localStorage.setItem('chats', JSON.stringify(chatsObject));
			}
			return newMap;
		});
		return chat.id;
	},
	getChat: (id: string): Chat | undefined => {
		let foundChat: Chat | undefined;
		chats.subscribe((map) => {
			foundChat = map.get(id);
		})();
		return foundChat;
	},
	updateChat: (id: string, updater: (chat: Chat) => Chat) => {
		chats.update((map) => {
			const chat = map.get(id);
			if (chat) {
				const updatedChat = updater(chat);
				const newMap = new Map(map);
				newMap.set(id, updatedChat);
				if (browser) {
					const chatsObject = Object.fromEntries(newMap);
					localStorage.setItem('chats', JSON.stringify(chatsObject));
				}
				return newMap;
			}
			return map;
		});
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
