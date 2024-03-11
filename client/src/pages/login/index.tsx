import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
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
			<div className={styles.inputs}>
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
			</div>

			<button disabled={isSubmitting} type='submit'>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</button>
		</form>
	)
}
export default Login
