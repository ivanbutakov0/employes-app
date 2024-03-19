import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import employeesReducer from '../features/employees/employeesSlice'
import { listeningMiddleware } from '../middleware/auth'
import { api } from './services/api'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		employees: employeesReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(api.middleware)
			.prepend(listeningMiddleware.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
