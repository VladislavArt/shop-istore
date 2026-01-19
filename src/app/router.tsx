import { createBrowserRouter, Outlet, redirect } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { MainContent } from '../components/mainContent/MainContent'
import { Product } from '../components/product/Product'
import Order from '@/components/order/Order'
import Footer from '@/components/footer/Footer'
import OrderSuccess from '@/components/orderSuccess/OrderSuccess'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<Layout>
					<Outlet />
				</Layout>
				<Footer />
			</>
		),
		children: [
			{
				index: true,
				loader: () => redirect('/products'),
			},
			{
				path: 'products',
				element: <MainContent />,
			},
			{
				path: 'products/:id',
				element: <Product />,
			},
		],
	},
	{
		path: 'order',
		element: <Order />
	},
	{
		path: 'orderSuccess',
		element: <OrderSuccess />
	}
])
