import { api } from '@/api/api'
import { useAppSelector } from '@/shared/redux'
import type { IProduct } from '@/types/product.type'

export function useProductsFiltered() {
	const {
		price: { min: minPrice, max: maxPrice },
		category,
		selectedMemory: memory,
		selectedColor: color,
		sort
	} = useAppSelector(state => state.filter)

	const { data } = api.useGetProductsQuery({
		category,
		minPrice,
		maxPrice,
		memory,
		color,
		sort
	})

	if (!data) {
		return { sortPriceProduct: () => [] }
	}

	const filteredProducts = data.filter(
		product =>
			product.price >= minPrice &&
			product.price <= maxPrice &&
			(product.cat === category || category === 'all') &&
			(memory.length === 0 || memory.includes(product.memory)) &&
			(color.length === 0 || color.includes(product.color))
	)

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

	return { sortedProducts }
}
