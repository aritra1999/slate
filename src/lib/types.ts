import { z } from 'zod';

export const ollamaModelSchema = z.object({
	name: z.string(),
	modified_at: z.string()
});

export const rolesEnum = z.enum(['user', 'assistant', 'system']);

export const messageSchema = z.object({
	content: z.string(),
	role: rolesEnum
});

export const modelSchema = z.object({
	id: z.string(),
	title: z.string(),
	name: z.string(),
	temperature: z.number(),
	source: z.enum(['local', 'self-hosted', 'remote'])
});

export const chatSchema = z.object({
	id: z.string(),
	title: z.string(),
	model: modelSchema,
	steam: z.boolean(),
	messages: z.array(messageSchema),
	updatedAt: z.date(),
	createdAt: z.date()
});

export type OllamaModel = z.infer<typeof ollamaModelSchema>;
export type Role = z.infer<typeof rolesEnum>;
export type Message = z.infer<typeof messageSchema>;
export type Model = z.infer<typeof modelSchema>;
export type Chat = z.infer<typeof chatSchema>;
