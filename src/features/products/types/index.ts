import { ApiResponse } from "@/shared/types"

export type ProductType = {
    id: number,
    product_name: string,
    category_name: string,
    price: number,
    stock: number,
    sales: number,
    created_at: string,
    description: string
}

export type ProductsResponse = ApiResponse & {
    data: {
        products: ProductType[]
        total: number
    }
}