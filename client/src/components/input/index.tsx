import { forwardRef } from 'react'
import styles from './index.module.css'

type InputProps = {
	id?: string
	type: 'text' | 'email' | 'password'
	placeholder: string
	register?: any
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<input
			ref={ref}
			id={props.id}
			className={styles.input}
			type={props.type}
			placeholder={props.placeholder}
			{...props.register}
		/>
	)
})

export default Input
