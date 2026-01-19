import { useAppSelector } from '@/shared/redux'
import { ColorCheckbox } from '../colorCheckbox/ColorCheckbox'
import './style.scss'

export function FilterColor() {
	const filterColor = useAppSelector(state => state.filter.color)

	return (
		<div className='filter-color'>
			<div className='filter-color__title'>Цвет</div>
			<div className='filter-color__list'>
				{filterColor.map((color, index) => {
					return <ColorCheckbox key={index} color={color} />
				})}
			</div>
		</div>
	)
}
