// Libs
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Features
import { authStore } from '@/features/auth/store'
import { authApi } from '@/features/auth/service'
import { productsApi } from '@/features/products/service'

export const store = configureStore({
    reducer: {
        auth: authStore.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
