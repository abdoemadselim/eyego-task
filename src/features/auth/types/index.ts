import { ApiResponse } from "@/shared/types"

export type User = {
    id: string
    name: string
    email: string
}

export type AuthResponse = ApiResponse & {
    data: {
        user: User
    },
    errors: string[],
    fieldErrors: Record<string, { message: string }>
}