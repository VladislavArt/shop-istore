import type { IProduct } from '@/types/product.type'
import { createAction, createReducer } from '@reduxjs/toolkit'

type CartState = {
	cartOpen: boolean
	items: IProduct[]
	totalCount: number
	totalAmount: number
}

const initialCartState: CartState = {
	cartOpen: false,
	items: [],
	totalCount: 0,
	totalAmount: 0
}

export const toggleCartOpenAction = createAction('toggleCart')
export const addProductCartAction = createAction<IProduct>('addProduct')
export const increaseCountAction = createAction<IProduct>('increase')
export const decreaseCountAction = createAction<IProduct>('decrease')
export const resetProductCartAction = createAction('resetProduct')

export const cartReducer = createReducer(initialCartState, builder => {
	builder.addCase(toggleCartOpenAction, state => {
		state.cartOpen = !state.cartOpen
	})

	builder.addCase(resetProductCartAction, state => {
		state.items = []
		state.totalAmount = 0
		state.totalCount = 0
	})

	builder.addCase(addProductCartAction, (state, action) => {
		const newItem = action.payload
		const productExists = state.items?.find(item => item.id === newItem.id)

		if (productExists) {
			productExists.count = (productExists.count ?? 0) + 1
			state.totalCount++
			state.totalAmount += productExists.price
		} else {
			state.items.push({ ...newItem, count: 1 })
			state.totalCount++
			state.totalAmount += newItem.price
		}
	})

	builder.addCase(increaseCountAction, (state, action) => {
		const productIndex = state.items.findIndex(
			item => item.id === action.payload.id
		)

		if (productIndex === -1) return

		const product = state.items[productIndex]

		product.count = (product.count ?? 0) + 1

		state.totalCount++
		state.totalAmount += product.price
	})

	builder.addCase(decreaseCountAction, (state, action) => {
		const productIndex = state.items.findIndex(
			item => item.id === action.payload.id
		)

		if (productIndex === -1) return

		const product = state.items[productIndex]
		state.totalCount--
		state.totalAmount -= product.price

		if (product.count === 1) {
			state.items.splice(productIndex, 1)
		} else {
			product.count = (product.count ?? 0) - 1
		}
	})
})
