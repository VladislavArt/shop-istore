import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from 'axios'

const baseUrl = "http://localhost:3000";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: () => ({})
})

export const baseAxiosApi = axios.create({
	baseURL: baseUrl
})
