import { debounce } from '@/utils/debounce'
import { useMemo } from 'react'

export function useDebounceProducts() {
	const debounceProducts = useMemo(
		() => debounce(productsApi.getProducts, 100),
		[]
	)
	return { debounceProducts }
}
