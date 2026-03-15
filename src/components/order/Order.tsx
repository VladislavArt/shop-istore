import { api } from '@/api/api'
import { Header } from '@/components/layout/header/Header'
import { resetProductCartAction } from '@/modules/cart/cart.slice'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'
import Cart from '../cart/Cart'
import CartItem from '../cart/cartItems/cartItem/CartItem'
import Footer from '../footer/Footer'
import style from './style.module.scss'

function Order() {
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const items = useAppSelector(state => state.cart.items)
	const totalAmount = useAppSelector(state => state.cart.totalAmount)
	const totalCount = useAppSelector(state => state.cart.totalCount)
	const cartOpen = useAppSelector(state => state.cart.cartOpen)

	const [addOrder] = api.useAddOrdersMutation()

	type Order = {
		name: string
		email: string
		cart: typeof items
	}

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<Order>({
		mode: 'onChange'
	})

	useEffect(() => {
		setValue('cart', items)
	}, [items, setValue])

	const onSubmit: SubmitHandler<Order> = async data => {
		console.log(data)
		try {
			await addOrder(data)
			dispatch(resetProductCartAction())
			navigate('/orderSuccess')
		} catch (error) {
			console.error('Failed to add order:', error)
		}
	}

	const orderItemsHTML = () => {
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

	return (
		<>
			<Header />
			{cartOpen && <Cart />}
			<div className={style.order}>
				<h1 className={style.title}>Ваш заказ</h1>
				{orderItemsHTML()}
				<div className={style['order-form']}>
					<form
						className={style.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							className={style.input}
							placeholder="Имя"
							{...register('name', { required: true })}
						/>
						{errors.name && <span>This field is required</span>}
						<input
							className={style.input}
							placeholder="email"
							{...register('email', { required: true })}
						/>
						{errors.email && <span>This field is required</span>}
						<Button title="Оформить заказ" />
					</form>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Order
