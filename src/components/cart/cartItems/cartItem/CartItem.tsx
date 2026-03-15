import {
	decreaseCountAction,
	increaseCountAction
} from '@/modules/cart/cart.slice'
import { useAppDispatch } from '@/shared/redux'
import type { IProduct } from '@/types/product.type'
import style from './style.module.scss'

interface Prop {
	item: IProduct
}

function CartItem({ item }: Prop) {
	const dispatch = useAppDispatch()

	return (
		<div className={style.item}>
			<div className={style.info}>
				<img
					className={style.img}
					src={`/images/${item.imgName}.jpg`}
					alt=""
				/>
				<div className={style.desc}>
					<h3 className={style.title}>{item.title}</h3>
					<p className={style.price}>{item.price}</p>
				</div>
			</div>
			<div className={style.controls}>
				<button
					className={style.btn}
					onClick={() => dispatch(decreaseCountAction(item))}
				>
					<img
						src="/images/minus.svg"
						alt=""
					/>
				</button>

				<input
					type="text"
					className={style.value}
					value={item.count}
					disabled
				/>

				<button
					className={style.btn}
					onClick={() => dispatch(increaseCountAction(item))}
				>
					<img
						src="/images/plus.svg"
						alt=""
					/>
				</button>
			</div>
		</div>
	)
}

export default CartItem
