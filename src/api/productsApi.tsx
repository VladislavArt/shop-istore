import { baseAxiosApi } from '@/shared/api'
import type { IProduct, ProductQueryParams } from '@/types/product.type'

export const productsApi = {
	getProducts: (params: ProductQueryParams, signal: AbortSignal) =>
		baseAxiosApi
			.get<IProduct[]>('/products', { params, signal })
			.then(res => res.data)
}
