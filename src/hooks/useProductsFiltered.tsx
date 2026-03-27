import { api } from '@/api/api'
import { useAppSelector } from '@/shared/redux'
import type { IProduct } from '@/types/product.type'
import { useMemo } from 'react'

export function useProductsFiltered() {
	const {
		price: { min: minPrice, max: maxPrice },
		category,
		selectedMemory,
		selectedColor,
		sort
	} = useAppSelector(state => state.filter)

	const { data, isLoading, isError } = api.useGetProductsQuery({
		category,
		minPrice,
		maxPrice,
		selectedMemory,
		selectedColor,
		sort
	})

	const filteredProducts = useMemo(() => {
		if (!data) return []

		return data.filter(product =>
			product.price >= minPrice &&
			product.price <= maxPrice &&
			(product.cat === category || category === 'all') &&
			(!selectedMemory.length || selectedMemory.includes(product.memory)) &&
			(!selectedColor.length || selectedColor.includes(product.color))
		)
	}, [data, category, minPrice, maxPrice, selectedMemory, selectedColor])

	const sortPriceProduct = (product: IProduct[], sorted: string) => {
		return product.sort((a, b) => {
			if (sorted === 'priceAsc') {
				return a.price - b.price
			} else if (sorted === 'priceDesc') {
				return b.price - a.price
			}
			return 0
		})
	}

	const sortedProducts = sortPriceProduct(filteredProducts, sort)

	return { sortedProducts, isLoading, isError }
}
