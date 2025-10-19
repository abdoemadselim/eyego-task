// Libs
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

// Shared
import { transformErrorResponse } from '@/shared/utils/api.utils'

// Features
import type { ProductType, CategoryType, ProductsResponse, CategoriesResponse } from '@/features/products/types'

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
            { page: number; page_size: number, search: string | null, sort_by?: string | null, sort_order?: string | null }
        >({
            query: ({ page, page_size, search, sort_by, sort_order }) => {
                const realPage = page > 0 ? page : 1
                const params = new URLSearchParams({
                    page: String(realPage - 1),
                    pageSize: String(page_size),
                })

                if (search) {
                    params.set('search', search)
                }

                if (sort_by && sort_order) {
                    params.set('sortBy', sort_by)
                    params.set('sortOrder', sort_order)
                }

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

        // Get top products sales
        getTopProductsSales: builder.query<{ products: ProductType[] }, void>({
            query: () => ({
                url: '/products/top-sales',
            }),
            transformResponse: (response: ProductsResponse) => response.data,
            transformErrorResponse,
            providesTags: [{ type: 'Products', id: 'LIST' }],
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
    useGetTopProductsSalesQuery,
} = productsApi

export const topProductsSalesData = {
    products: [
        {
            id: 1,
            product_name: 'Samsung Galaxy S23',
            sales: 100,
        },
        {
            id: 2,
            product_name: 'Apple iPhone 15',
            sales: 200,
        },
        {
            id: 3,
            product_name: 'Google Pixel 8',
            sales: 300,
        },
        {
            id: 4,
            product_name: 'OnePlus 12',
            sales: 400,
        },
        {
            id: 5,
            product_name: 'Xiaomi 14',
            sales: 500,
        },
    ],
}