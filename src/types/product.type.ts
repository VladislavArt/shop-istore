export interface IProduct {
	id: string,
	imgName: string,
	title: string,
	price: number,
	cat: string,
	memory: string,
	color: string,
	desc: string
	count?: number
}

export type Order = {
	name: string
	email: string
	cart: IProduct[]
}

export type ProductQueryParams = {
	category?: string
	memory?: string[]
	color?: string[]
	minPrice?: number
	maxPrice?: number
	sort?: string
}

export type TProductId = string
