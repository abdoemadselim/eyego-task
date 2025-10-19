// Libs
import {
    ColumnDef,
} from "@tanstack/react-table"

// Shared
import SortableHeader from "@/shared/components/data-table/sortable-header"

// Features
import { ProductType } from "@/features/products/types"

const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "product_name",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} header={
                    <p className="lg:text-lg pr-2 text-gray-500">Product Name</p>
                } />
            )
        },
        enableSorting: true,
        cell: (({ row }) => (
            <p className="lg:text-lg pr-2 font-semibold">
                {row.original.product_name ?
                    row.original.product_name
                    : <span className="text-gray-500">N/A</span>
                }
            </p>
        ))
    },
    {
        accessorKey: "category_name",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} header={
                    <p className="lg:text-lg pr-8 text-gray-500">Category</p>
                } />
            )
        },
        enableSorting: true,
        cell: ({ row }) => (
            <p className="lg:text-lg pr-8 font-semibold">
                {row.original.category_name ?
                    row.original.category_name
                    : <span className="text-gray-500">N/A</span>
                }
            </p>
        ),
    },
    {
        accessorKey: "sales",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} header={
                    <p className="lg:text-lg pr-8 text-gray-500">Sales</p>
                } />
            )
        },
        enableSorting: true,
        cell: ({ row }) => (
            <p className="lg:text-lg pr-8 font-semibold">
                {row.original.sales !== undefined ?
                    row.original.sales
                    : <span className="text-gray-500">N/A</span>
                }
            </p>
        ),
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} header={
                    <p className="lg:text-lg pr-8 text-gray-500">Stock</p>
                } />
            )
        },
        enableSorting: true,
        cell: ({ row }) => (
            <p className="lg:text-lg pr-8 font-semibold">
                {row.original.stock ?
                    row.original.stock > 0 ?
                        `${row.original.stock} in stock` :
                        <span className="text-red-500">Out of stock</span>
                    : <span className="text-gray-500">N/A</span>
                }
            </p>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} header={
                    <p className="lg:text-lg pr-8 text-gray-500">Price</p>
                } />
            )
        },
        enableSorting: true,
        cell: ({ row }) => (
            <p className="lg:text-lg pr-8 font-semibold">
                {row.original.price !== undefined ?
                    <span >${row.original.price}</span>
                    : <span className="text-gray-500">N/A</span>
                }
            </p>
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <SortableHeader column={column} header={
                    <p className="lg:text-lg text-gray-500">Date Added</p>
                } />
            )
        },
        enableSorting: true,
        cell: ({ row }) => (
            <p className="lg:text-lg font-semibold">
                {row.original.created_at ?
                    new Date(row.original.created_at).toLocaleDateString('en-US')
                    : <span className="text-gray-500">N/A</span>
                }
            </p>
        ),
    },
    {
        accessorKey: "description",
        header: () => <p className="lg:text-lg text-gray-500">Description</p>,
        cell: ({ row }) => (
            <p className="lg:text-md font-semibold">
                {row.original.description ?
                    row.original.description
                    : <span className="text-gray-500">N/A</span>
                }
            </p>
        ),
    },
]

export default columns