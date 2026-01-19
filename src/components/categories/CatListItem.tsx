import { catAction } from '@/modules/filter/filter.slice'
import { useAppDispatch } from '@/shared/redux'
import type { ICategories } from '@/types/categories.types'
import { Link } from 'react-router-dom'

interface Props {
	category: ICategories
}

export function CatListItem({ category }: Props) {
	const dispatch = useAppDispatch()

	const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
		const target = event.currentTarget
		const categories = target.getAttribute('data-category')
		if (categories !== null) {
			dispatch(catAction(categories))
		}
	}

	return (
		<li>
			<Link to='/' data-category={category.slug} onClick={clickHandler}>
				{category.title}
			</Link>
		</li>
	)
}
