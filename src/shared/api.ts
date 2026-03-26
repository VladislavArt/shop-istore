import { debounce } from '@/utils/debounce'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

export const baseApi = createApi({
	baseQuery: debounce(fetchBaseQuery({ baseUrl })),
	endpoints: () => ({})
})

