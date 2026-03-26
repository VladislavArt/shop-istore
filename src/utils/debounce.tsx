import type { BaseQueryFn } from '@reduxjs/toolkit/query'

export const debounce = (baseQuery: BaseQueryFn): BaseQueryFn => {
	let timeout: ReturnType<typeof setTimeout> | null = null

	return async (args, api, extraOptions) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const debounceDelay = (extraOptions as any)?.debounce ?? 0

		if (debounceDelay === 0) {
			return baseQuery(args, api, extraOptions)
		}

		if (timeout) clearTimeout(timeout)

		return new Promise((resolve) => {
			timeout = setTimeout(async () => {
				if (api.signal.aborted) return
				resolve(await baseQuery(args, api, extraOptions))
			}, debounceDelay)
		})
	}
}
