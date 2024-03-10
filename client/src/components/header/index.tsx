import { LogIn, User, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './index.module.css'

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link to='/' className={styles.logo}>
					<UsersRound /> Сотрудники
				</Link>
				<nav className={styles.nav}>
					<ul className={styles.navList}>
						<li>
							<Link to='/register' className={styles.navItem}>
								<User /> Зарегистрироваться
							</Link>
						</li>
						<li>
							<Link to='/login' className={styles.navItem}>
								<LogIn /> Войти
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
export default Header
