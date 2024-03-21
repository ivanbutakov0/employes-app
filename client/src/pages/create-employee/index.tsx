import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useCreateEmployeeMutation } from '../../app/services/employees'
import EmployeeFrom from '../../components/employee-form'
import { selectUser } from '../../features/auth/authSlice'
import { Employee } from '../../types'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'

const CreateEmployee = () => {
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [createEmployee] = useCreateEmployeeMutation()

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	})

	const handleSubmit = async (data: Employee) => {
		try {
			await createEmployee(data).unwrap()

			navigate(`/status/created`)
		} catch (error) {
			const maybeError = isErrorWithMessage(error)
			setError(maybeError ? error.data.message : 'Что-то пошло не так')
		}
	}

	return (
		<div>
			<EmployeeFrom
				title='Добавить сотрудника'
				btnText='Добавить'
				onSubmit={handleSubmit}
				error={error}
			/>
		</div>
	)
}
export default CreateEmployee
