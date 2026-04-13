import { useAppSelector } from '@/shared/redux'
import { ColorCheckbox } from '../colorCheckbox/ColorCheckbox'
import './style.scss'

export function FilterColor() {
	const filterColor = useAppSelector(state => state.filter.color)

	return (
		<div className='filter-color'>
			<h3 className='filter-color__title'>Цвет</h3>
			<div className='filter-color__list'>
				{filterColor.map(color => {
					return <ColorCheckbox key={color} color={color} />
				})}
			</div>
		</div>
	)
}
