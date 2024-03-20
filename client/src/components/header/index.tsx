import { LogIn, LogOut, User, UsersRound } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, selectUser } from '../../features/auth/authSlice'
import styles from './index.module.css'

const Header = () => {
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onLogoutClick = () => {
		dispatch(logout())
		localStorage.removeItem('token')
		navigate('/login')
	}
	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link to='/' className={styles.logo}>
					<UsersRound /> Сотрудники
				</Link>
				<nav className={styles.nav}>
					{!user ? (
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
					) : (
						<span className={styles.navItem} onClick={onLogoutClick}>
							<LogOut /> Выйти
						</span>
					)}
				</nav>
			</div>
		</header>
	)
}
export default Header
