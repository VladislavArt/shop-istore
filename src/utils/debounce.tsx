import type { IProduct, ProductQueryParams } from '@/types/product.type'

type DebounceFunction = (params: ProductQueryParams, signal: AbortSignal) => Promise<IProduct[]>

export function debounce(func: DebounceFunction, delay: number) {
	let timeout: ReturnType<typeof setTimeout> | null

	return function(params: ProductQueryParams, signal: AbortSignal): Promise<IProduct[]> {
		return new Promise((resolve) => {
			if (timeout) {
				clearTimeout(timeout)
			}

			timeout = setTimeout(async () => {
				try {
					const data = await func(params, signal)
					resolve(data)
					console.log(data)
				} catch (error) {
					console.log(error, 'ошибка данных')
				}
			}, delay)
		})
	}
}
