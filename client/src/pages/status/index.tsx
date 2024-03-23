import { Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import styles from './index.module.css'

const Statuses: Record<string, string> = {
	created: 'Пользователь успешно создан',
	updated: 'Пользователь успешно обновлен',
	deleted: 'Пользователь успешно удален',
}

const Status = () => {
	const { status } = useParams()
	return (
		<div className={styles.container}>
			<Check width={100} height={100} className={styles.check} />
			<h1 className={styles.title}>
				{status ? Statuses[status] : 'Статус не определён'}
			</h1>
			<Link to='/' className={styles.link}>
				На Главную
			</Link>
		</div>
	)
}
export default Status
