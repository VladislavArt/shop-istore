import { baseApi } from '@/shared/api'
import type { ICategories } from '@/types/categories.types'
import { CatsDtoSchema, ProductsDtoSchema } from '@/types/dtoSchema'
import type { IProduct, Order, TProductId } from '../types/product.type'

export const api = baseApi.injectEndpoints({
	endpoints: build => ({
		getCats: build.query<ICategories[], void>({
			query: () => '/categories',
			transformResponse: (res: ICategories[]) =>
				CatsDtoSchema.array().parse(res)
		}),

		getProduct: build.query<IProduct, TProductId>({
			query: productId => `/products/${productId}`,
			transformResponse: (res: IProduct) => ProductsDtoSchema.parse(res)
		}),

		addOrders: build.mutation<void, Order>({
			query: body => ({
				method: 'POST',
				body,
				url: `/orders`
			})
		})
	}),
	overrideExisting: true
})
