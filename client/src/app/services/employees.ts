import { Employee } from '../../types'
import { api } from './api'

type ResponseSingleEmployee = {
	success: boolean
	data: Employee
}

type ResponseMultipleEmployees = {
	success: boolean
	data: Employee[]
}

export const employeesApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllEmployees: builder.query<ResponseMultipleEmployees, void>({
			query: () => ({
				url: '/employee',
				method: 'GET',
			}),
		}),
		getEmployeeById: builder.query<ResponseSingleEmployee, string>({
			query: id => ({
				url: `/employee/${id}`,
				method: 'GET',
				body: id,
			}),
		}),
		createEmployee: builder.mutation<ResponseSingleEmployee, Employee>({
			query: employee => ({
				url: '/employee/create',
				method: 'POST',
				body: employee,
			}),
		}),
		removeEmployee: builder.mutation<ResponseSingleEmployee, string>({
			query: id => ({
				url: `/employee/remove/${id}`,
				method: 'DELETE',
				body: id,
			}),
		}),
		editEmployee: builder.mutation<ResponseSingleEmployee, Employee>({
			query: employee => ({
				url: `/employee/edit/${employee.id}`,
				method: 'PUT',
				body: employee,
			}),
		}),
	}),
})

export const {
	useGetAllEmployeesQuery,
	useGetEmployeeByIdQuery,
	useCreateEmployeeMutation,
	useRemoveEmployeeMutation,
	useEditEmployeeMutation,
} = employeesApi

export const {
	endpoints: {
		getAllEmployees,
		getEmployeeById,
		createEmployee,
		removeEmployee,
		editEmployee,
	},
} = employeesApi
