import { api } from '@/api/api'
import { addProductCartAction } from '@/modules/cart/cart.slice'
import { useAppDispatch } from '@/shared/redux'
import type { TProductId } from '@/types/product.type'
import { skipToken } from '@reduxjs/toolkit/query'
import { useParams } from 'react-router-dom'
import Button from '../button/Button'
import { Error } from '../error/Error'
import './style.scss'

export function Product() {
	const dispatch = useAppDispatch()
	const { id } = useParams<{ id: TProductId }>()

	const { data: product, isLoading } = api.useGetProductQuery(id ?? skipToken)

	if (isLoading) return <div>Loading...</div>

	if (!product) {
		return <Error message="Данные по продуктам с сервера не пришли" />
	}

	return (
		<>
			<article className="product">
				<div className="product__img-wrapper">
					<img
						src={`../images/${product.imgName}.jpg`}
						alt={product.title}
					/>
				</div>

				<div className="product__desc">
					<h1 className="product__title">{product.title}</h1>
					<p className="product__price">
						<span>{product.price}</span>
					</p>
					<p className="product__text">{product.desc}</p>
					<Button
						title="В Корзину"
						onClick={() => dispatch(addProductCartAction(product))}
						disabled={false}
					/>
				</div>
			</article>
		</>
	)
}
