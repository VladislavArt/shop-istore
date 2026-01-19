import { api } from '@/api/api'
import { CatListItem } from './CatListItem'
import './style.scss'

export function Categories() {
	const { data: cats, isLoading } = api.useGetCatsQuery()

	if (isLoading) {
		return <div>...Loading</div>
	}

	return (
		<div>
			<div className='cat-title'>Категории</div>
			<ul className='cat-list'>
				{cats?.map(category => {
					return (
						<CatListItem key={category.id} category={category} />
					)
				})}
			</ul>
		</div>
	)
}
