import { api } from '@/api/api'
import { resetProductCartAction } from '@/modules/cart/cart.slice'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import type { Order } from '@/types/product.type'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'
import style from './style.module.scss'

export function FormOrder() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const items = useAppSelector(state => state.cart.items)

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<Order>({
		mode: 'onChange'
	})

	const [addOrder] = api.useAddOrdersMutation()

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

	return (
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
	)
}
