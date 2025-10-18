'use client'

// Libs
import { Provider, useDispatch } from 'react-redux'
import { useEffect } from 'react'

// Shared
import { store } from '@/store'

// Features
import { clearUser, setUser, setIsLoading } from '@/features/auth/store'
import { useUserQuery } from '@/features/auth/service'

function AuthInitializer() {
    const dispatch = useDispatch()
    const { data: user, isSuccess, isError } = useUserQuery()

    useEffect(() => {
        dispatch(setIsLoading(true))

        if (isSuccess && user) {
            dispatch(setUser(user))
        } else if (isError) {
            dispatch(clearUser())
        }
    }, [user, isSuccess, isError, dispatch])

    return null
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthInitializer />
            {children}
        </Provider>
    )
}