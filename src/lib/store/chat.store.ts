import type { Chat } from '$lib/types';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedChats = browser ? localStorage.getItem('chats') : null;
const initialChats: Chat[] = storedChats ? JSON.parse(storedChats) : [];

const storedSelectedChat = browser ? localStorage.getItem('selectedChat') : null;
const initialSelectedChat: string | null = storedSelectedChat || null;

const chats = writable<Chat[]>(initialChats);
const selectedChat = writable<string | null>(initialSelectedChat);

export const chatStore = {
	subscribe: chats.subscribe,
	set: (value: Chat[]) => {
		if (browser) localStorage.setItem('chats', JSON.stringify(value));
		chats.set(value);
	},
	update: (updater: (value: Chat[]) => Chat[]) => {
		chats.update((value) => {
			const updatedValue = updater(value);
			if (browser) localStorage.setItem('chats', JSON.stringify(updatedValue));
			return updatedValue;
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
