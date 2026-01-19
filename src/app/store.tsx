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
	key: 'root',
	storage,
	whitelist: ['cart'],
}

const rootReducer = combineReducers({
	filter: filterReducer,
	cart: cartReducer,
	[baseApi.reducerPath]: baseApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: { extraArgument },
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware),
})

export const persistor = persistStore(store)

// export const store = configureStore({
// 	reducer: {
// 		filter: filterReducer,
// 		cart: cartReducer,
// 		[baseApi.reducerPath]: baseApi.reducer,
// 	},

// 	middleware: getDefaultMiddleware =>
// 		getDefaultMiddleware({ thunk: { extraArgument } }).concat(
// 			baseApi.middleware
// 		),
// })
