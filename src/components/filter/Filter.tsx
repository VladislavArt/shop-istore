import { FilterMemory } from '@/components/filterMemory/FilterMemory'
import { FilterPrice } from '@/components/filterPrice/FilterPrice'
import { FilterColor } from '@/components/filterColor/FilterColor'
import './style.scss'

export function Filter() {

	return (
		<div className='filter'>
			<div className='filter__wrapper'>
				<h2 className='filter__title'>Фильтр</h2>
				<FilterPrice />
				<FilterMemory />
				<FilterColor />
			</div>
		</div>
	)
}
