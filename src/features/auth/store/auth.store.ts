// Libs
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

// Feature
import { User } from '@/features/auth/types'

type AuthState = {
    user: User | null,
    isLoading: boolean
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
            state.isLoading = false
        },
        clearUser: (state) => {
            state.user = null
            state.isLoading = false
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
})

export const { setUser, clearUser, setIsLoading } = authSlice.actions

