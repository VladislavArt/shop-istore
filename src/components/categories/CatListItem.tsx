import { catAction } from '@/modules/filter/filter.slice'
import { useAppDispatch } from '@/shared/redux'
import type { ICategories } from '@/types/categories.types'

interface Props {
	category: ICategories
}

export function CatListItem({ category }: Props) {
	const dispatch = useAppDispatch()

	const clickHandler = () => {
		dispatch(catAction(category.slug))
	}

	return (
		<li>
			<button onClick={clickHandler}>
				{category.title}
			</button>
		</li>
	)
}
