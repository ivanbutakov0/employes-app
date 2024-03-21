export type ErrorWithMessage = {
	status: number
	data: {
		success: boolean
		message: string
	}
}

export type Employee = {
	id?: string
	firstName: string
	lastName: string
	age: string
	address: string
	userId?: string
	createdAt?: string
	updatedAt?: string
}
