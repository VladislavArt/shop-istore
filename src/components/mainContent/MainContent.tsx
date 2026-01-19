import { api } from '@/api/api'
import { useAppSelector } from '@/shared/redux'
import { Card } from '../card/Card'
import { Error } from '../error/Error'
import { PriceReactSelect } from '../priceReactSelect/PriceReactSelect'
import './style.scss'
import type { IProduct } from '@/types/product.type'

export function MainContent() {
	const minPrice = useAppSelector(state => state.filter.price.min)
	const maxPrice = useAppSelector(state => state.filter.price.max)
	const category = useAppSelector(state => state.filter.category)
	const memory = useAppSelector(state => state.filter.selectedMemory)
	const color = useAppSelector(state => state.filter.selectedColor)
	const sort = useAppSelector(state => state.filter.sort)

	const { data, isLoading } = api.useGetProductsQuery({
		category,
		memory,
		minPrice,
		maxPrice,
		sort
	})

	if (isLoading) {
		return <Error message='Loading...' />
	}

	if (!data) {
		return <Error message='Данные по продуктам, с сервера не загрузились' />
	}

	const filteredProducts = data.filter(
		product =>
			product.price >= minPrice &&
			product.price <= maxPrice &&
			(product.cat === category || category === 'all') &&
			(memory.length === 0 || memory.includes(product.memory)) &&
			(color.length === 0 || color.includes(product.color))
	)

	if (filteredProducts.length === 0) {
		return <Error message='Нет доступных продуктов, по выбранным фильтрам' />
	}

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

	return (
		<>
			{data.length ? (
				<div className='sort-wrapper'>
					<PriceReactSelect />
				</div>
			) : (
				<Error message='Нет продуктов для отображения. Поменяйте значение фильтра' />
			)}

			<div className='content__cards-grid'>
				{sortedProducts.map(product => {
					return <Card key={product.id} product={product} />
				})}
			</div>
		</>
	)
}
