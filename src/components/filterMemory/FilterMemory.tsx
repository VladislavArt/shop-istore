import './style.scss'
import { CheckBox } from '../checkbox/CheckBox'
import { useAppSelector } from '@/shared/redux'

export function FilterMemory() {
	const memory = useAppSelector(state => state.filter.memory)

	return (
		<div className='filter-memory'>
			<div className='filter-memory__title'>Объем памяти</div>
			<div className='filter-memory__list'>
				{memory.map((memory, index) => {
					return <CheckBox key={index} memory={memory} />
				})}
			</div>
		</div>
	)
}
