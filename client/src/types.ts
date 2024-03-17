export type ErrorWithMessage = {
	status: number
	data: {
		success: boolean
		message: string
	}
}
