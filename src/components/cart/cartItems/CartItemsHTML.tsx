import Button from '@/components/button/Button'
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
				{items.map(item => {
					return (
						<CartItem
							key={item.id}
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
				<Button
					as={Link}
					to="/order"
					title="Оформить заказ"
				/>
			) : (
				<Button title="Заполните форму" />
			)}
		</>
	)
}
