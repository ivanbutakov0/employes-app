import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
	useGetEmployeeByIdQuery,
	useRemoveEmployeeMutation,
} from '../../app/services/employees'
import { selectUser } from '../../features/auth/authSlice'
import styles from './index.module.css'

const Employee = () => {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const { id } = useParams() as { id: string }
	const { data, isLoading } = useGetEmployeeByIdQuery(id || '')
	const [removeEmployee] = useRemoveEmployeeMutation()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (!user) {
			return navigate('/login')
		}
	}, [user, navigate])

	if (isLoading) {
		return <span>Загрузка...</span>
	}

	if (!data) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Информация о сотруднике</h1>

			<table className={styles.table}>
				<tbody>
					<tr className={styles.tr}>
						<td className={styles.td}>Имя</td>
						<td className={styles.td}>{data?.data.firstName}</td>
					</tr>
					<tr className={styles.tr}>
						<td className={styles.td}>Фамилия</td>
						<td className={styles.td}>{data?.data.lastName}</td>
					</tr>
					<tr className={styles.tr}>
						<td className={styles.td}>Возраст</td>
						<td className={styles.td}>{data?.data.age}</td>
					</tr>
					<tr className={styles.tr}>
						<td className={styles.td}>Адрес</td>
						<td className={styles.td}>{data?.data.address}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
export default Employee
