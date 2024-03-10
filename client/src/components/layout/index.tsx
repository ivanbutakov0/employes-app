import { Outlet } from 'react-router-dom'
import Header from '../header'
import styles from './index.module.css'

const Layout = () => {
	return (
		<div>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	)
}
export default Layout
