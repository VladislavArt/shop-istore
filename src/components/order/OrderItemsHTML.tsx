import { useAppSelector } from '@/shared/redux'
import CartItem from '../cart/cartItems/cartItem/CartItem'
import style from './style.module.scss'

export const OrderItemsHTML = () => {
	const { items, totalAmount, totalCount } = useAppSelector(state => state.cart)

	if (items && items.length) {
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
					<p>Итого: {totalCount} </p>
					<p>Стоимость: {totalAmount} </p>
				</section>
			</>
		)
	}
}
