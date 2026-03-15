import { toggleCartOpenAction } from '@/modules/cart/cart.slice'
import { useAppDispatch } from '@/shared/redux'
import { CartItemsHTML } from './cartItems/CartItemsHTML'
import style from './style.module.scss'

function Cart() {
	const dispatch = useAppDispatch()

	return (
		<section className={style.cart}>
			<header className={style.header}>
				<h2 className={style.title}>Корзина</h2>
				<button
					className={style.closeBtn}
					onClick={() => dispatch(toggleCartOpenAction())}
				>
					<img
						src="/images/close.svg"
						alt=""
					/>
				</button>
			</header>

			<div className={style.body}>
				<CartItemsHTML />
			</div>
		</section>
	)
}

export default Cart
