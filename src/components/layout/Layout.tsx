import type { PropsWithChildren } from 'react'
import { Header } from './header/Header'
import { Sidebar } from '@/components/sidebar/Sidebar'
import './style.scss'
import { useAppSelector } from '@/shared/redux'
import Cart from '../cart/Cart'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	const cartOpen = useAppSelector(state => state.cart.cartOpen)

	return (
		<>
			<Header />
			{cartOpen && <Cart />}
			<div className='layout'>
				<Sidebar />
				<main>{children}</main>
			</div>
		</>
	)
}
