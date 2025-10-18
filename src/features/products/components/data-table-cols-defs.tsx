// Libs
import {
    ColumnDef,
} from "@tanstack/react-table"

// Features
import { ProductType } from "@/features/products/types"

const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "name",
        header: () => <p className="lg:text-lg pr-2 text-gray-500">Product Name</p>,
        enableHiding: false,
        cell: (({ row }) => (
            <p className="lg:text-lg pr-2 font-semibold">{row.original.name}</p>
        ))
    },
    {
        accessorKey: "category",
        header: () => <p className="lg:text-lg pr-8 text-gray-500">Category</p>,
        cell: ({ row }) => (
            <p className="lg:text-lg pr-8 font-semibold">
                {row.original.category}
            </p>
        ),
    },
    {
        accessorKey: "stock",
        header: () => <p className="lg:text-lg pr-8 text-gray-500">Stock</p>,
        cell: ({ row }) => (
            <p className="lg:text-lg pr-8 font-semibold">
                {row.original.stock} in stock
            </p>
        ),
    },
    {
        accessorKey: "price",
        header: () => <p className="lg:text-lg pr-8 text-gray-500">Price</p>,
        cell: ({ row }) => (
            <p className="lg:text-lg pr-8 font-semibold">
                ${row.original.price}
            </p>
        ),
    },
    {
        accessorKey: "created_at",
        header: () => <p className="lg:text-lg text-gray-500">Date Added</p>,
        cell: ({ row }) => (
            <p className="lg:text-lg font-semibold">
                {new Date(row.original.created_at).toLocaleDateString('en-US')}
            </p>
        ),
    },
    {
        accessorKey: "description",
        header: () => <p className="lg:text-lg text-gray-500">Description</p>,
        cell: ({ row }) => (
            <p className="lg:text-md font-semibold">
                {row.original.description}
            </p>
        ),
    },
]

export default columns