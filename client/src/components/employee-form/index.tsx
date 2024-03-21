import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Employee } from '../../types'
import Button from '../button'
import Input from '../input'
import styles from './index.module.css'

const employeeFormSchema = z.object({
	firstName: z.string().min(1, { message: 'Введите Имя' }),
	lastName: z.string().min(1, { message: 'Введите Фамилия' }),
	age: z.string().min(1, { message: 'Введите Возраст' }),
	address: z.string().min(1, { message: 'Введите Адрес' }),
})

type employeeFormData = z.infer<typeof employeeFormSchema>

type Props<T> = {
	onSubmit: (data: T) => void
	title: string
	btnText: string
	error?: string
	employee?: T
}

const EmployeeFrom = ({
	onSubmit,
	title,
	btnText,
	error,
	employee,
}: Props<Employee>) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<employeeFormData>({
		resolver: zodResolver(employeeFormSchema),
		defaultValues: employee,
	})

	useEffect(() => {
		setError('root', { message: error })
	}, [error, setError])

	const onSubmitHandler: SubmitHandler<employeeFormData> = async data => {
		await onSubmit(data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
			<h1 className={styles.title}>{title}</h1>
			<div className={styles.content}>
				<div>
					<Input
						id='firstName'
						type='text'
						placeholder='Имя'
						register={register('firstName')}
					/>
					{errors.firstName && (
						<p className={styles.error}>{errors.firstName.message}</p>
					)}
				</div>
				<div>
					<Input
						id='lastName'
						type='text'
						placeholder='Фамилия'
						register={register('lastName')}
					/>
					{errors.lastName && (
						<p className={styles.error}>{errors.lastName.message}</p>
					)}
				</div>
				<div>
					<Input
						id='age'
						type='number'
						placeholder='Возраст'
						register={register('age')}
						min={1}
					/>
					{errors.age && <p className={styles.error}>{errors.age.message}</p>}
				</div>
				<div>
					<Input
						id='address'
						type='text'
						placeholder='Адрес'
						register={register('address')}
					/>
					{errors.address && (
						<p className={styles.error}>{errors.address.message}</p>
					)}
				</div>
				{error && <p className={styles.error}>{error}</p>}
				<Button disabled={isSubmitting}>
					<Plus width={20} height={20} />
					{btnText}
				</Button>
			</div>
		</form>
	)
}
export default EmployeeFrom
