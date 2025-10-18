import { ApiResponse } from "@/shared/types"

export type ProductType = {
    id: number,
    name: string,
    category: string,
    price: number,
    stock: number,
    created_at: string,
    description: string
}

export type CategoryType = {
    id: number,
    name: string
}

export type ProductsResponse = ApiResponse & {
    data: {
        products: ProductType[]
        total: number
    }
}