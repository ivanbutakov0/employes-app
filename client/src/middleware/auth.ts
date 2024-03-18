import { createListenerMiddleware } from '@reduxjs/toolkit'
import { authApi } from '../app/services/auth'

export const listeningMiddleware = createListenerMiddleware()

listeningMiddleware.startListening({
	matcher: authApi.endpoints.login.matchFulfilled,
	effect: async (action, listenerApi) => {
		listenerApi.cancelActiveListeners()

		if (action.payload.data.token) {
			localStorage.setItem('token', action.payload.data.token)
		}
	},
})
