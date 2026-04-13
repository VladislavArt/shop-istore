import { useAppDispatch, useAppSelector } from '@/shared/redux'
import './style.scss'
import { toggleColorAction } from '@/modules/filter/filter.slice'

type Prop = {
	color: string
}

export function ColorCheckbox({ color }: Prop) {
	const selectedColor = useAppSelector(state => state.filter.selectedColor)
	const dispatch = useAppDispatch()

	const handleChange = () => {
		dispatch(toggleColorAction(color))
	}

	return (
		<label className='color-checkbox'>
			<input
				type="checkbox"
				className="color-checkbox__real visually-hidden"
				value={color}
				checked={selectedColor.includes(color)}
				onChange={handleChange}
			/>
			<span className={`color-checkbox__visible ${color}`}></span>
		</label>
	)
}
