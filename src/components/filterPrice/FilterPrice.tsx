import CurrencyInput from 'react-currency-input-field'
import './style.scss'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import ReactRangeSliderInput from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import { priceMaxAction, priceMinAction } from '@/modules/filter/filter.slice'

export function FilterPrice() {
	const dispatch = useAppDispatch()

	const { price: { min, max } } = useAppSelector(state => state.filter)

	const handleChangePrice = (type: 'min' | 'max') => (value?: string) => {
		const num = value ? Number(value) : (type === 'min' ? 0 : 500000)
		dispatch(type === 'min' ? priceMinAction(num) : priceMaxAction(num))
	}

	const handleChangeRange = (value: number[]) => {
		dispatch(priceMinAction(value[0]))
		dispatch(priceMaxAction(value[1]))
	}

	return (
		<div className='filter-price'>
			<div className='filter-price__title'>Цена</div>
			<div className='filter-price__input'>
				<CurrencyInput
					id='priceMin'
					className='input'
					value={min || ''}
					name='priceMin'
					placeholder='Please enter'
					decimalsLimit={0}
					suffix='₽'
					onValueChange={handleChangePrice('min')}
				/>

				<span>-</span>
				
				<CurrencyInput
					id='priceMax'
					className='input'
					value={max === 500000 ? '' : max}
					name='priceMax'
					placeholder='Please enter'
					decimalsLimit={0}
					suffix='₽'
					onValueChange={handleChangePrice('max')}
				/>
			</div>

			<div className='filter-price__range'>
				<ReactRangeSliderInput
					value={[min, max]}
					onInput={handleChangeRange}
					min={0}
					max={500000}
				/>
			</div>
		</div>
	)
}
