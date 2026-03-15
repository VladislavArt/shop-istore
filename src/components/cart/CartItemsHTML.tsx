import { useAppSelector } from '@/shared/redux'
import { Link } from 'react-router-dom'
import Button from '../button/Button'
import btn from '../button/style.module.scss'
import CartItem from '../cartItem/CartItem'
import style from './style.module.scss'

export const CartItemsHTML = () => {
	const { items, totalCount, totalAmount } = useAppSelector(state => state.cart)
	if (items.length === 0) {
		return (
			<section className={style.items}>
				<p>Корзина пуста</p>
			</section>
		)
	}

	if (items.length > 0) {
		return (
			<>
				<section className={style.items}>
					{items.map((item, index) => {
						return (
							<CartItem
								key={index}
								item={item}
							/>
						)
					})}
				</section>

				<section className={style.info}>
					<p>Итого: {totalCount}</p>
					<p>Стоимость: {totalAmount}</p>
				</section>

				<Link
					to="order"
					className={btn.btn}
				>
					<Button title="Оформить заказ" />
				</Link>
			</>
		)
	}
}
