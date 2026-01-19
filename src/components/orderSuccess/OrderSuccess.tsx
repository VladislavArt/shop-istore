import { Header } from '../layout/header/Header'
import style from './style.module.scss'

function OrderSuccess() {
	return (
		<article>
			<Header />
			<div className={style.wrapper}>
				<div className={style.info}>
					<h1 className={style.title}>Заказ создан успешно!</h1>
				</div>
			</div>
		</article>
	)
}

export default OrderSuccess;
