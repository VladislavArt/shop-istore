import './style.scss'
import { CheckBox } from '../checkbox/CheckBox'
import { useAppSelector } from '@/shared/redux'

export function FilterMemory() {
	const memory = useAppSelector(state => state.filter.memory)

	return (
		<div className='filter-memory'>
			<h3 className='filter-memory__title'>Объем памяти</h3>
			<div className='filter-memory__list'>
				{memory.map(memory => {
					return <CheckBox key={memory} memory={memory} />
				})}
			</div>
		</div>
	)
}
