// Libs
import {
    ColumnDef,
} from "@tanstack/react-table"

// Features
import { ProductType } from "@/features/products/types"

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "name",
        header: () => <p className="lg:text-lg pr-2">Product Name</p>,
        enableHiding: false,
        cell: (({ row }) => (
            <p className="lg:text-lg pr-2">{row.original.name}</p>
        ))
    },
    {
        accessorKey: "category",
        header: () => <p className="lg:text-lg pr-8">Category</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg pr-8">
                <p className="lg:text-lg pr-2">
                    {row.original.category}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "stock",
        header: () => <p className="lg:text-lg pr-8">Stock</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg pr-8">
                <p className="lg:text-lg pr-2">
                    {row.original.stock}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <p className="lg:text-lg pr-8">Price</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg pr-8">
                <p className="lg:text-lg pr-2">
                    ${row.original.price}
                </p>
            </div>
        ),
    },
    {
        accessorKey: "created_at",
        header: () => <p className="lg:text-lg">Date Added</p>,
        cell: ({ row }) => (
            <div className="lg:text-lg text-gray-600">
                {new Date(row.original.created_at).toLocaleDateString('en-US')}
            </div>
        ),
    },
    {
        accessorKey: "description",
        header: () => <p className="lg:text-lg">Description</p>,
        cell: ({ row }) => (
            <div className="lg:text-md">
                {row.original.description}
            </div>
        ),
    },
]
