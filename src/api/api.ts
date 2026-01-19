import { baseApi } from '@/shared/api'
import type { ICategories } from '@/types/categories.types'
import { z } from 'zod'
import type { IProduct, Order, ProductQueryParams, TProductId } from '../types/product.type'

const ProductsDtoSchema = z.object({
	id: z.union([z.string(), z.number().transform(val => String(val))]),
	imgName: z.string(),
	title: z.string(),
	price: z.number(),
	cat: z.string(),
	memory: z.string(),
	color: z.string(),
	desc: z.string(),
})

const CatsDtoSchema = z.object({
	id: z.union([z.string(), z.number().transform(val => String(val))]),
	slug: z.string(),
	title: z.string(),
})

export const api = baseApi.injectEndpoints({
	endpoints: build => ({
		getCats: build.query<ICategories[], void>({
			query: () => '/categories',
			transformResponse: (res: unknown) => CatsDtoSchema.array().parse(res),
		}),
		getProducts: build.query<
			IProduct[], ProductQueryParams
		>({
			query: ({ category, memory, color, minPrice, maxPrice, sort }) => {
				const params = new URLSearchParams()

				if (category) {
					params.append('category', category)
				}
				if (memory && memory.length > 0) {
					memory.forEach(mem => params.append('memory', mem))
				}
				if (color && color.length > 0) {
					color.forEach(col => params.append('color', col))
				}
				if (minPrice !== undefined) {
					params.append('minPrice', minPrice.toString())
				}
				if (maxPrice !== undefined) {
					params.append('maxPrice', maxPrice.toString())
				}
				if (sort !== undefined) {
					params.append('sort', sort)
				}

				return `/products?${params.toString()}`
			},
			// providesTags: ['Products', { type: 'Products', id: 'LIST' }],
			transformResponse: (res: unknown) => ProductsDtoSchema.array().parse(res),
		}),
		getProduct: build.query<IProduct, TProductId>({
			query: productId => `/products/${productId}`,
			// providesTags: ['Products'],
			transformResponse: (res: unknown) => ProductsDtoSchema.parse(res),
		}),
		addOrders: build.mutation<void, Order>({
			query: (body) => ({ 
				method: "POST",
				body,
				url: `/orders`
			})
		})
	}),
	overrideExisting: true,
})
