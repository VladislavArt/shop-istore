import { baseApi } from '@/shared/api'
import type { ICategories } from '@/types/categories.types'
import { CatsDtoSchema, ProductsDtoSchema } from '@/types/dtoSchema'
import type {
	IProduct,
	Order,
	ProductQueryParams,
	TProductId
} from '../types/product.type'

export const api = baseApi.injectEndpoints({
	endpoints: build => ({
		getCats: build.query<ICategories[], void>({
			query: () => '/categories',
			transformResponse: (res: ICategories[]) =>
				CatsDtoSchema.array().parse(res)
		}),

		getProducts: build.query<IProduct[], ProductQueryParams>({
			query: (params: ProductQueryParams) => ({
				url: '/products',
				params
			})
		}),

		// getProducts: build.query<IProduct[], ProductQueryParams>({
		// 		queryFn: async (arg: ProductQueryParams, api: BaseQueryApi) => {
		// 			const { signal } = api
		// 			try {
		// 				const data = await debounceProducts(arg, signal)
		// 				return { data }
		// 			} catch (error) {
		// 				return {
		// 					error: {
		// 						status: 'FETCH_ERROR',
		// 						error: (error as Error).message,
		// 						data: undefined
		// 					} as FetchBaseQueryError
		// 				}
		// 			}
		// 		}
		// 	})

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
