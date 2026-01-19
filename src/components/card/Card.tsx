import type { IProduct } from '@/types/product.type'
import Button from '../button/Button'
import './style.scss'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '@/shared/redux'
import { addProductCartAction } from '@/modules/cart/cart.slice'

export function Card({ product }: { product: IProduct }) {
	const dispatch = useAppDispatch()

	return (
		<div className='card'>
			<img
				className='card__img'
				src={`./images/${product.imgName}.jpg`}
				alt={product.title}
			/>
			<Link to={`/products/${product.id}`} className='card__link'>
				<h3 className='card__title'>{product.title}</h3>
			</Link>
			<p className='card__price'>{product.price}</p>
			<Button
				title='В корзину'
				onClick={() => dispatch(addProductCartAction(product))}
				disabled={false}
			/>
		</div>
	)
}
