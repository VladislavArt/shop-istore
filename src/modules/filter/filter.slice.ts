import { createAction, createReducer } from "@reduxjs/toolkit"

type FilterState = {
	category: string
	price: {
		min: number
		max: number
	},
	memory: string[]
	selectedMemory: string[]
	color: string[]
	selectedColor: string[]
	sort: string
}

const initialFilterState: FilterState = {
	category: 'all',
	price: {
		min: 0,
		max: 500000
	},
	memory: ['0 Tb', '64 Gb', '128 Gb', '256 Gb', '512 Gb', '1 Tb', '2 Tb'],
	selectedMemory: [],
	color: ['white', 'gray', 'space-gray', 'black'],
	selectedColor: [],
	sort: ''
}

export const priceMinAction = createAction<number>('price/min')
export const priceMaxAction = createAction<number>('price/max')
export const catAction = createAction<string>('cat')
export const toggleMemoryAction = createAction<string>('memory')
export const resetCheckboxAction = createAction<[]>('resetCheckbox')
export const toggleColorAction = createAction<string>('color')
export const changeSortAction = createAction<string>('sort')

export const filterReducer = createReducer(
	initialFilterState,
	(builder) => {
		builder.addCase(priceMinAction, (state, action) => {
			state.price.min = action.payload
		});
		builder.addCase(priceMaxAction, (state, action) => {
			state.price.max = action.payload
		});
		builder.addCase(catAction, (state, action) => {
			state.category = action.payload
		});
		builder.addCase(toggleMemoryAction, (state, action) => {
			if (state.selectedMemory.includes(action.payload)) {
				state.selectedMemory = state.selectedMemory.filter(item => item !== action.payload)
			} else {
				state.selectedMemory = [...state.selectedMemory, action.payload]
			}
		});
		builder.addCase(resetCheckboxAction, (state) => {
			state.selectedMemory = []
			state.selectedColor = []
		});
		builder.addCase(toggleColorAction, (state, action) => {
			if (state.selectedColor.includes(action.payload)) {
				state.selectedColor = state.selectedColor.filter(item => item !== action.payload)
			} else {
				state.selectedColor = [...state.selectedColor, action.payload]
			}
		});
		builder.addCase(changeSortAction, (state, action) => {
			state.sort = action.payload
		});
	}
)
