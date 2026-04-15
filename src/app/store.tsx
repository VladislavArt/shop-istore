import { cartReducer } from '@/modules/cart/cart.slice'
import { filterReducer } from '@/modules/filter/filter.slice'
import { baseApi } from '@/shared/api'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { router } from './router'

export const extraArgument = {
	router,
}

const persistConfig = {
	key: 'cart',
	storage
}

const rootReducer = combineReducers({
	filter: filterReducer,
	cart: persistReducer(persistConfig, cartReducer),
	[baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: { extraArgument },
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware),
})

export const persistor = persistStore(store)
