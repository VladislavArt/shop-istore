import { Categories } from '../categories/Categories'
import { Filter } from '@/components/filter/Filter'
import './style.scss'

export function Sidebar() {
	return (
		<aside className='sidebar'>
			<Categories />
			<Filter />
		</aside>
	)
}
