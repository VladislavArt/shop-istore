import { baseAxiosApi } from '@/shared/api'
import type { IProduct, ProductQueryParams } from '@/types/product.type'
import { debounce } from '@/utils/debounce'
import { useMemo } from 'react'

const productsApi = {
	getProducts: (params: ProductQueryParams, signal: AbortSignal) =>
		baseAxiosApi
			.get<IProduct[]>('/products', { params, signal })
			.then(res => res.data)
}

export function useDebounceProducts() {
	const debounceProducts = useMemo(
		() => debounce(productsApi.getProducts, 100),
		[]
	)
	return { debounceProducts }
}
