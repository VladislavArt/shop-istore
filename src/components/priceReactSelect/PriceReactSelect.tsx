import { changeSortAction } from "@/modules/filter/filter.slice";
import { useAppDispatch, useAppSelector } from "@/shared/redux";
import Select from "react-select";

export function PriceReactSelect() {
	const dispatch = useAppDispatch()
	const sort = useAppSelector(state => state.filter.sort)

	const options = [
		{ value: 'priceAsc', label: 'От дешевых к дорогим' },
		{ value: 'priceDesc', label: 'От дорогих к дешевым' }
	]

	const defaultValueIndex = options.findIndex(item => {
		return sort === item.value
	})

	const handleChange = (option: {value: string, label: string} | null) => {
		if (option) {
			dispatch(changeSortAction(option.value))
		} else {
			dispatch(changeSortAction(''))
		}
	}

	return (
		<Select
			className='priceReactSelect'
			isClearable
			options={options}
			placeholder='Сортировать по цене'
			defaultValue={options[defaultValueIndex]}
			onChange={(option) => handleChange(option)}
		/>
	)
}
