import { baseApi, baseAxiosApi } from '@/shared/api'
import type { ICategories } from '@/types/categories.types'
import type { IProduct, Order, ProductQueryParams, TProductId } from '../types/product.type'
import { CatsDtoSchema, ProductsDtoSchema } from '@/types/dtoSchema'
import { debounce } from '@/utils/debounce'
import type { BaseQueryApi, FetchBaseQueryError } from '@reduxjs/toolkit/query'

const productsApi = {
	getProducts: (params: ProductQueryParams, signal: AbortSignal) =>
		baseAxiosApi.get<IProduct[]>('/products', { params, signal }).then(res => res.data)
}

const debounceGetProducts = debounce(productsApi.getProducts, 100)

export const api = baseApi.injectEndpoints({
	endpoints: build => ({

		getCats: build.query<ICategories[], void>({
			query: () => '/categories',
			transformResponse: (res: ICategories[]) => CatsDtoSchema.array().parse(res),
		}),

		getProducts: build.query<
			IProduct[], ProductQueryParams
		>({
			queryFn: async (arg: ProductQueryParams, api: BaseQueryApi) => {
				const { signal } = api
				try {
					const data = await debounceGetProducts(arg, signal)
					return { data }
				} catch (error) {
					return {
						error: {
							status: 'FETCH_ERROR',
							error: (error as Error).message || 'An unknown error occurred',
							data: undefined 
						} as FetchBaseQueryError,
      		}
				}
			},
		}),

		// getProducts: build.query<
		// 	IProduct[], ProductQueryParams
		// >({
		// 	query: (search: ProductQueryParams) => {
		// 		const params = createSearchParams(search)
		// 		return `/products?${params.toString()}`
		// 	},
		// 	transformResponse: (res: IProduct[]): IProduct[] => ProductsDtoSchema.array().parse(res)
		// }),

		getProduct: build.query<IProduct, TProductId>({
			query: productId => `/products/${productId}`,
			transformResponse: (res: IProduct) => ProductsDtoSchema.parse(res),
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
