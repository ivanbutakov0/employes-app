import styles from './index.module.css'

type ButtonProps = {
	type?: 'submit' | 'button'
	disabled?: boolean
	children: React.ReactNode
	onClick?: () => void
}

const Button = ({
	type = 'submit',
	disabled,
	children,
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={styles.button}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
export default Button
