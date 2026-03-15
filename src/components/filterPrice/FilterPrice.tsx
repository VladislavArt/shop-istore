import CurrencyInput from 'react-currency-input-field'
import './style.scss'
import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { priceMaxAction, priceMinAction } from '@/modules/filter/filter.slice'
import ReactRangeSliderInput from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

export function FilterPrice() {
	const dispatch = useAppDispatch()

	const { price: { min, max } } = useAppSelector(state => state.filter)

	const handleChangeMin = (value: string | undefined) => {
		dispatch(priceMinAction(Number(value)))
	}

	const handleChangeMax = (value: string | undefined) => {
		dispatch(priceMaxAction(Number(value)))
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
					placeholder='Please enter the number'
					decimalsLimit={0}
					suffix='₽'
					onValueChange={(value) => handleChangeMin(value || '')}
				/>

				<span>-</span>
				
				<CurrencyInput
					id='priceMax'
					className='input'
					value={max === 500000 ? '' : max}
					name='priceMax'
					placeholder='Please enter the number'
					decimalsLimit={0}
					suffix='₽'
					onValueChange={(value) => handleChangeMax(value || '')}
				/>
			</div>

			<div className='filter-price__range'>
				<ReactRangeSliderInput
					value={[min, max]}
					onInput={(value) => {
						handleChangeMin(String(value[0]))
						handleChangeMax(String(value[1]))
					}}
					min={0}
					max={500000}
				/>
			</div>
		</div>
	)
}
