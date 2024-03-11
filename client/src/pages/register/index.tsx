import { zodResolver } from '@hookform/resolvers/zod'
import { EyeOff } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import Button from '../../components/button'
import Input from '../../components/input'
import styles from './index.module.css'

const registerSchema = z
	.object({
		name: z.string().min(1, { message: 'Имя' }),
		email: z
			.string()
			.email({ message: 'Пожалуйста, введите корректный email' })
			.min(1, { message: 'Email обязателен' }),
		password: z
			.string()
			.min(6, { message: 'Пароль должен быть не менее 6 символов' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

type RegisterFormData = z.infer<typeof registerSchema>

const Register = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit: SubmitHandler<RegisterFormData> = data => {
		// Handle form submission logic (e.g., send login request)
		console.log('Login data:', data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.title}>Зарегистрируйтесь</h1>
			<div className={styles.content}>
				<div>
					<Input
						id='name'
						type='text'
						placeholder='Имя'
						register={register('name')}
					/>
					{errors.name && <p className={styles.error}>{errors.name.message}</p>}
				</div>
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
				<div className={styles.input}>
					<Input
						id='confirmPassword'
						type={isPasswordVisible ? 'text' : 'password'}
						placeholder='Подтвердите пароль'
						register={register('confirmPassword')}
					/>
					<button
						type='button'
						className={styles.pasVisible}
						onClick={() => setIsPasswordVisible(prev => !prev)}
					>
						<EyeOff stroke='#ccc' size={20} />
					</button>
					{errors.confirmPassword && (
						<p className={styles.error}>{errors.confirmPassword.message}</p>
					)}
				</div>

				<Button disabled={isSubmitting}>
					{isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
				</Button>
				<p className={styles.text}>
					Уже есть аккаунт?{' '}
					<Link to='/login' className={styles.link}>
						Войти
					</Link>
				</p>
			</div>
		</form>
	)
}
export default Register
