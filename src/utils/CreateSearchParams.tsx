import type { ProductQueryParams } from '@/types/product.type'

export function createSearchParams (search: ProductQueryParams) {
	const params = new URLSearchParams()

	if (search.category) {
		params.append('category', search.category)
	}

	if (search.memory) {
		search.memory.forEach(mem => params.append('memory', mem.toString()))
	}

	if (search.color) {
		search.color.forEach(col => params.append('color', col.toString()))
	}

	if (search.minPrice) {
		params.append('minPrice', search.minPrice.toString())
	}

	if (search.maxPrice) {
		params.append('maxPrice', search.maxPrice.toString())
	}

	return params
}
