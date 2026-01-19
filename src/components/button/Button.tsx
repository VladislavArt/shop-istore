import btn from './style.module.scss'

type Button = {
	title: string
	disabled?: boolean
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Button( {title, disabled = false, onClick}: Button ) {
	return (
		<button 
			className={btn.btn}
			disabled={disabled}
			onClick={onClick}
		>
			{title}
		</button>
	);
}

export default Button
