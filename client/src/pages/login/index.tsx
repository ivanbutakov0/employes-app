import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import Button from '../../components/button'
import Input from '../../components/input'
import styles from './index.module.css'

const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Пожалуйста, введите корректный email' })
		.min(1, { message: 'Email обязателен' }),
	password: z
		.string()
		.min(6, { message: 'Пароль должен быть не менее 6 символов' }),
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		setError,
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
				<div>
					<Input
						id='email'
						type='email'
						placeholder='Email'
						register={register('email')}
					/>
					{errors.email && (
						<p className={styles.error}>{errors.email.message}</p>
					)}
				</div>
				<div className={styles.input}>
					<Input
						id='password'
						type={isPasswordVisible ? 'text' : 'password'}
						placeholder='Пароль'
						register={register('password')}
					/>
					<button
						type='button'
						className={styles.pasVisible}
						onClick={() => setIsPasswordVisible(prev => !prev)}
					>
						<EyeOff stroke='#ccc' size={20} />
					</button>
					{errors.password && (
						<p className={styles.error}>{errors.password.message}</p>
					)}
				</div>

				<Button disabled={isSubmitting}>
					{isSubmitting ? 'Вход...' : 'Войти'}
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
