import { z } from 'zod'

export const ProductsDtoSchema = z.object({
	id: z.union([z.string(), z.number().transform(val => String(val))]),
	imgName: z.string(),
	title: z.string(),
	price: z.number(),
	cat: z.string(),
	memory: z.string(),
	color: z.string(),
	desc: z.string(),
})

export const CatsDtoSchema = z.object({
	id: z.union([z.string(), z.number().transform(val => String(val))]),
	slug: z.string(),
	title: z.string(),
})
