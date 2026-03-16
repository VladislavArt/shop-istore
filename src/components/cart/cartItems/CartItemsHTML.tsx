import Button from '@/components/button/Button'
import btn from '@/components/button/style.module.scss'
import { useAppSelector } from '@/shared/redux'
import { Link, useLocation } from 'react-router-dom'
import style from '../style.module.scss'
import CartItem from './cartItem/CartItem'

export const CartItemsHTML = () => {
	const { items, totalCount, totalAmount } = useAppSelector(state => state.cart)
	const location = useLocation()

	if (items.length === 0) {
		return (
			<section className={style.items}>
				<p>Корзина пуста</p>
			</section>
		)
	}

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

			{location.pathname !== '/order' ? (
				<Link
					to="order"
					className={btn.btn}
				>
					<Button title="Оформить заказ" />
				</Link>
			) : (
				<Button title="Заполните форму" />
			)}
		</>
	)
}
