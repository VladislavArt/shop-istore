import { FcAbout } from "react-icons/fc"
import './style.scss'

interface Props {
	message: string
}

export function Error({ message }: Props) {
	return (
		<div className="error">
			<div className="error__icon">
				<FcAbout size='10em' />
			</div>
			<div className="error__text">{message}</div>
		</div>
	)
}
