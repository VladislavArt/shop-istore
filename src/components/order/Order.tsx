import { Header } from '@/components/layout/header/Header'

import { useAppSelector } from '@/shared/redux'
import Cart from '../cart/Cart'
import Footer from '../footer/Footer'
import { FormOrder } from './FormOrder'
import { OrderItemsHTML } from './OrderItemsHTML'
import style from './style.module.scss'

function Order() {
	const cartOpen = useAppSelector(state => state.cart.cartOpen)

	return (
		<>
			<Header />
			{cartOpen && <Cart />}
			<div className={style.order}>
				<h1 className={style.title}>Ваш заказ</h1>
				<OrderItemsHTML />
				<div className={style['order-form']}>
					<FormOrder />
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Order
