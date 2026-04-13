import { type ElementType } from 'react'
import btn from './style.module.scss'

type Button = {
	title: string
	disabled?: boolean
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	as?: ElementType
	[key: string]: unknown
}

function Button({
	title,
	disabled = false,
	onClick,
	as: Component = 'button',
	...props
}: Button) {
	return (
		<Component
			className={btn.btn}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{title}
		</Component>
	)
}

export default Button
