import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' })

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: true,
	endpoints: () => ({}),
})
