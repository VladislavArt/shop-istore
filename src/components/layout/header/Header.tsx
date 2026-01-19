import { Link } from 'react-router-dom'
import './style.scss'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { catAction, changeSortAction, priceMaxAction, priceMinAction, resetCheckboxAction } from '@/modules/filter/filter.slice'
import { toggleCartOpenAction } from '@/modules/cart/cart.slice'

export function Header() {
	const dispatch = useAppDispatch()
	const totalCount = useAppSelector(state => state.cart.totalCount)

	const clickHandler = () => {
		dispatch(catAction('all'))
		dispatch(priceMinAction(0))
		dispatch(priceMaxAction(500000))
		dispatch(resetCheckboxAction([]))
		dispatch(changeSortAction(''))
	}

	return (
		<div className='header'>
			<div className='header__wrapper'>
				<Link to='/' className='logo' onClick={clickHandler}>
					istore
				</Link>

				<button 
					className='cart'
					onClick={() => dispatch(toggleCartOpenAction())}
				>
					<img src='/images/cart.svg' alt='Cart' />
					{totalCount > 0 ? <div className='cart__count'>{totalCount}</div> : null}
					<span>Корзина</span>
				</button>
			</div>
		</div>
	)
}
