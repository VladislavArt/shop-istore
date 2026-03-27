import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const timeouts = new Map<string, ReturnType<typeof setTimeout>>()

export const debounce = (baseQuery: BaseQueryFn): BaseQueryFn => {
	return async (args, api, extraOptions) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const debounceDelay = (extraOptions as any)?.debounce ?? 0

		if (debounceDelay === 0) {
			return baseQuery(args, api, extraOptions)
		}

		const endpoint = api.endpoint

		if (timeouts.has(endpoint)) {
			clearTimeout(timeouts.get(endpoint))
		}

		return new Promise(resolve => {
			const timeout = setTimeout(async () => {
				timeouts.delete(endpoint)

				if (api.signal.aborted) return

				resolve(await baseQuery(args, api, extraOptions))
			}, debounceDelay)
			timeouts.set(endpoint, timeout)
		})
	}
}
