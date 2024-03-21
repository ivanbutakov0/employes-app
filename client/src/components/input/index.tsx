import { forwardRef } from 'react'
import styles from './index.module.css'

type InputProps = {
	id?: string
	type: 'text' | 'email' | 'password' | 'number'
	placeholder: string
	register?: any
	min?: number
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<input
			ref={ref}
			id={props.id}
			className={styles.input}
			type={props.type}
			placeholder={props.placeholder}
			min={props.min}
			{...props.register}
		/>
	)
})

export default Input
