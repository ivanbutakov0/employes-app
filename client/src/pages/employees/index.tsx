import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetAllEmployeesQuery } from '../../app/services/employees'
import Button from '../../components/button'
import { selectUser } from '../../features/auth/authSlice'
import styles from './index.module.css'

const Employees = () => {
	const { data, isLoading } = useGetAllEmployeesQuery()
	const navigate = useNavigate()
	const user = useSelector(selectUser)

	useEffect(() => {
		if (!user) {
			navigate('/login')
		}
	}, [user, navigate])

	return (
		<div className={styles.container}>
			<Button
				type='button'
				onClick={() => console.log('click')}
				disabled={isLoading}
			>
				<Plus width={20} height={20} />
				Добавить
			</Button>
			{isLoading ? (
				<span>Загрузка...</span>
			) : (
				<table className={styles.table}>
					<thead className={styles.thead}>
						<tr>
							<th className={styles.th}>Имя</th>
							<th className={styles.th}>Возраст</th>
							<th className={styles.th}>Адрес</th>
						</tr>
					</thead>
					<tbody className={styles.tbody}>
						{data?.data?.map(employee => (
							<tr key={employee.id}>
								<td
									className={styles.td + ' ' + styles.tdName}
									onClick={() => navigate(`/employees/${employee.id}`)}
								>
									{employee.firstName}
								</td>
								<td className={styles.td}>{employee.age}</td>
								<td className={styles.td}>{employee.address}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}
export default Employees
