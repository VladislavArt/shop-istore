import { useProductsFiltered } from '@/hooks/useProductsFiltered'
import { Card } from '../card/Card'
import { Error } from '../error/Error'
import { PriceReactSelect } from '../priceReactSelect/PriceReactSelect'
import './style.scss'
import LoaderMain from '../loaderMainContent/LoaderMain'

export function MainContent() {
	const { sortedProducts, isLoading, isError } = useProductsFiltered()

	if (isLoading) {
		return <LoaderMain />
	}

	if (!sortedProducts || isError) {
		return <Error message="Данные по продуктам с сервера не пришли" />
	}

	if (sortedProducts.length === 0) {
		return (
			<Error message="Нет продуктов для отображения. Поменяйте значение фильтра" />
		)
	}

	console.log(sortedProducts)

	return (
		<>
			<div className="sort-wrapper">
				<PriceReactSelect />
			</div>

			<div className="content__cards-grid">
				{sortedProducts.map(product => {
					return (
						<Card
							key={product.id}
							product={product}
						/>
					)
				})}
			</div>
		</>
	)
}
