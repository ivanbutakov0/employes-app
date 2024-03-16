import { api } from './api'

export type UserData = {
	name: string
	email: string
	createdAt: string
	updatedAt: string
}

type ResponseLoginData = UserData & {
	token: string
}

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<ResponseLoginData, UserData>({
			query: userData => ({
				url: '/user/login',
				method: 'POST',
				body: userData,
			}),
		}),
		register: builder.mutation<ResponseLoginData, UserData>({
			query: userData => ({
				url: '/user/register',
				method: 'POST',
				body: userData,
			}),
		}),
		current: builder.query<ResponseLoginData, void>({
			query: () => ({
				url: '/user/current',
				method: 'GET',
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
	authApi

export const { login, register, current } = authApi.endpoints
