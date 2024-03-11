import { forwardRef } from 'react'
import styles from './index.module.css'

type InputProps = {
	id?: string
	type: 'text' | 'email' | 'password'
	placeholder: string
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<div>
			<input
				ref={ref}
				id={props.id}
				className={styles.input}
				type={props.type}
				placeholder={props.placeholder}
			/>
		</div>
	)
})

export default Input
