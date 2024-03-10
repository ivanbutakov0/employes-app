import { Outlet } from 'react-router-dom'
import styles from './index.module.css'

const Layout = () => {
	return (
		<div className={styles.main}>
			<main>
				<Outlet />
			</main>
		</div>
	)
}
export default Layout
