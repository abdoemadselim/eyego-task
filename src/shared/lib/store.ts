// Libs
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Features
import { authStore } from '@/features/auth/store'
import { authApi } from '@/features/auth/service'

export const store = configureStore({
    reducer: {
        auth: authStore.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
