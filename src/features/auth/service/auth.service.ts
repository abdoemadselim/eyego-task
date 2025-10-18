// Libs
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

// Share
import { transformErrorResponse } from '@/shared/utils/api.utils';

// Features
import type { AuthResponse, User } from '@/features/auth/types'
import type { LoginType, NewUserType } from '@/features/auth/schema'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: retry(
        fetchBaseQuery({
            baseUrl: '/api/auth',
            credentials: 'include',
        }),
        { maxRetries: 3 }
    ),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        // Get current user
        user: builder.query<User, void>({
            query: () => ({
                url: '/me',
                cache: 'no-store' as RequestCache,
            }),
            // Backend response follows this structure {data: {}, errors: [""], fieldErrors: {field: {message: ""}}}
            transformResponse: (response: AuthResponse) => response.data.user,
            providesTags: ['Auth'],
        }),

        // Login
        login: builder.mutation<User, LoginType>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: AuthResponse) => response.data.user,
            invalidatesTags: ['Auth'],
            transformErrorResponse
        }),

        // Signup
        signup: builder.mutation<User, NewUserType>({
            query: (userData) => ({
                url: '/signup',
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response: AuthResponse) => response.data.user,
            invalidatesTags: ['Auth'],
            transformErrorResponse
        }),

        // Logout
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
})

export const {
    useUserQuery,
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation
} = authApi

