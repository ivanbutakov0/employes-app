import { createSlice } from '@reduxjs/toolkit'
import { UserData, authApi } from '../../app/services/auth'
import { RootState } from '../../app/store'

type InitialStateType = {
	user: (UserData & { token: string }) | null
	isAuthenticated: boolean
}

const initialState: InitialStateType = {
	user: null,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => initialState,
	},
	extraReducers: builder => {
		builder
			.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
				state.user = action.payload
				state.isAuthenticated = true
			})
			.addMatcher(
				authApi.endpoints.register.matchFulfilled,
				(state, action) => {
					state.user = action.payload
					state.isAuthenticated = true
				}
			)
			.addMatcher(authApi.endpoints.current.matchFulfilled, (state, action) => {
				state.user = action.payload
				state.isAuthenticated = true
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer

export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user
