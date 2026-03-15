import { baseApi } from '@/shared/api'
import type { ICategories } from '@/types/categories.types'
import type { IProduct, Order, ProductQueryParams, TProductId } from '../types/product.type'
import { createSearchParams } from '@/utils/CreateSearchParams'
import { CatsDtoSchema, ProductsDtoSchema } from '@/types/dtoSchema'

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
