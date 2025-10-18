// Libs
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

// Shared
import { transformErrorResponse } from '@/shared/lib/api.utils'

// Features
import type { ProductType, CategoryType, ProductsResponse } from '@/features/products/types'

interface CategoriesResponse {
    data: {
        categories: CategoryType[]
    }
    errors?: string[]
    fieldErrors?: Record<string, { message: string }>
}

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: '/api',
            credentials: 'include',
        }),
        { maxRetries: 3 }
    ),
    tagTypes: ['Products', 'Categories'],
    endpoints: (builder) => ({
        // Get products with pagination and search
        getProducts: builder.query<
            { products: ProductType[]; total: number },
            { page: number; page_size: number }
        >({
            query: ({ page, page_size }) => {
                const realPage = page > 0 ? page : 1
                const params = new URLSearchParams({
                    page: String(realPage - 1),
                    pageSize: String(page_size),
                })

                return {
                    url: `/products?${params.toString()}`,
                }
            },
            transformResponse: (response: ProductsResponse) => response.data,
            transformErrorResponse,
            providesTags: (result) =>
                result
                    ? [
                        ...result.products.map(({ id }) => ({ type: 'Products' as const, id })),
                        { type: 'Products', id: 'LIST' },
                    ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),

        // Get categories
        getCategories: builder.query<{ categories: CategoryType[] }, void>({
            query: () => ({
                url: '/categories',
            }),
            transformResponse: (response: CategoriesResponse) => response.data,
            transformErrorResponse,
            providesTags: [{ type: 'Categories', id: 'LIST' }],
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetCategoriesQuery,
} = productsApi

