import { toggleCartOpenAction } from '@/modules/cart/cart.slice';
import style from './style.module.scss'
import { useAppDispatch, useAppSelector } from "@/shared/redux";
import CartItem from '../cartItem/CartItem';
import Button from '../button/Button'
import { Link } from 'react-router-dom'
import btn from '../button/style.module.scss'

function Cart () {
	const dispatch = useAppDispatch()
	const items = useAppSelector(state => state.cart.items)
	const totalCount = useAppSelector(state => state.cart.totalCount)
	const totalAmount = useAppSelector(state => state.cart.totalAmount)

	const cartItemsHTML = () => {
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
							return <CartItem key={index} item={item} />
						})}
					</section>

					<section className={style.info}>
						<p>Итого: {totalCount}</p>
						<p>Стоимость: {totalAmount}</p>
					</section>

					<Link to='order' className={btn.btn}>
						<Button
							title='Оформить заказ'
						/>
					</Link>
				</>
			)
		}
	}
	
	return (
		<section className={style.cart}>
			<header className={style.header}>
				<h2 className={style.title}>Корзина</h2>
				<button
					className={style.closeBtn}
					onClick={() => dispatch(toggleCartOpenAction())}
				>
					<img src='/images/close.svg' alt="" />
				</button>
			</header>

			<div className={style.body}>
				{cartItemsHTML()}
			</div>

		</section>
	)
}

export default Cart;
