import { TailSpin } from 'react-loader-spinner'
import './style.scss'

function LoaderMain() {
	return (
		<div className='wrapper-loader'>
			<TailSpin />
		</div>
	)
}

export default LoaderMain;