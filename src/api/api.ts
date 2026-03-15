import { baseApi } from '@/shared/api'
import type { ICategories } from '@/types/categories.types'
import { z } from 'zod'
import type { IProduct, Order, ProductQueryParams, TProductId } from '../types/product.type'
import { createSearchParams } from '@/utils/CreateSearchParams'

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
			query: (search: ProductQueryParams) => {
				const params = createSearchParams(search)
				return `/products?${params.toString()}`
			},
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
