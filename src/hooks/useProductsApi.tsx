import { useDebounceProducts } from '@/hooks/useDebounceProducts'
import { baseApi } from '@/shared/api'
import type { IProduct, ProductQueryParams } from '@/types/product.type'
import type { BaseQueryApi, FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function useProductsApi() {
	const { debounceProducts } = useDebounceProducts()

	const api = baseApi.injectEndpoints({
		endpoints: build => ({
			getProducts: build.query<IProduct[], ProductQueryParams>({
				queryFn: async (arg: ProductQueryParams, api: BaseQueryApi) => {
					const { signal } = api
					try {
						const data = await debounceProducts(arg, signal)
						return { data }
					} catch (error) {
						return {
							error: {
								status: 'FETCH_ERROR',
								error: (error as Error).message,
								data: undefined
							} as FetchBaseQueryError
						}
					}
				}
			})
		})
	})

	return { api }
}
