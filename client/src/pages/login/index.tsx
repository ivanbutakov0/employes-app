import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import Button from '../../components/button'
import Input from '../../components/input'
import styles from './index.module.css'

const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Неверный формат' })
		.min(1, { message: 'Email обязателен' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен быть не менее 6 символов' }),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit: SubmitHandler<LoginFormData> = data => {
		// Handle form submission logic (e.g., send login request)
		console.log('Login data:', data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.title}>Войдите</h1>
			<div className={styles.content}>
				<Input
					id='email'
					type='email'
					placeholder='Email'
					{...register('email')}
				/>
				{errors.email && <p className='error'>{errors.email.message}</p>}
				<Input
					id='password'
					type='password'
					placeholder='Email'
					{...register('email')}
				/>
				{errors.password && <p className='error'>{errors.password.message}</p>}

				<Button disabled={isSubmitting}>
					{isSubmitting ? 'Загрузка...' : 'Вход'}
				</Button>
				<p className={styles.text}>
					Нет аккаунта?{' '}
					<Link to='/register' className={styles.link}>
						Зарегистрироваться
					</Link>
				</p>
			</div>
		</form>
	)
}
export default Login
