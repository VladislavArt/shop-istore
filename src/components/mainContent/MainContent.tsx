import { Card } from '../card/Card'
import { Error } from '../error/Error'
import { PriceReactSelect } from '../priceReactSelect/PriceReactSelect'
import './style.scss'
import { useProductsFiltered } from './useProductsFiltered'

export function MainContent() {
	const { sortedProducts } = useProductsFiltered()

	if (!sortedProducts) {
		return <Error message="Данные по продуктам с сервера не пришли" />
	}

	return (
		<>
			{sortedProducts ? (
				<div className="sort-wrapper">
					<PriceReactSelect />
				</div>
			) : (
				<Error message="Нет продуктов для отображения. Поменяйте значение фильтра" />
			)}

			<div className="content__cards-grid">
				{sortedProducts?.map(product => {
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
