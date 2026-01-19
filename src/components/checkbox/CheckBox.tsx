import { useAppDispatch, useAppSelector } from '@/shared/redux'
import './style.scss'
import { toggleMemoryAction } from '@/modules/filter/filter.slice'

type Prop = {
	memory: string
}

export function CheckBox({ memory }: Prop) {
	const dispatch = useAppDispatch()
	const selectedMemory = useAppSelector(state => state.filter.selectedMemory)

	const handleCheckboxChange = (value: string) => {
		dispatch(toggleMemoryAction(value))
	}

	return (
		<div className="checkbox">
			<label>
				<input
					type='checkbox'
					value={memory}
					checked={selectedMemory.includes(memory)}
					onChange={() => handleCheckboxChange(memory)}
				/>
			</label>
			<span className='checkbox__title'>{memory}</span>
		</div>
	)
}
