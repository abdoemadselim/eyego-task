// Libs
import {
    Column
} from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

// Features
import { ProductType } from "@/features/products/types"

export default function SortableHeader({ header, column }: { header: React.ReactNode, column: Column<ProductType, unknown> }) {
    const isSorted = column.getIsSorted()

    return (
        <button
            className="flex items-center gap-2 hover:text-gray-700 transition-colors"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {header}
            {isSorted === "asc" ? (
                <ArrowUp className="h-4 w-4" />
            ) : isSorted === "desc" ? (
                <ArrowDown className="h-4 w-4" />
            ) : (
                <ArrowUpDown className="h-4 w-4" />
            )}
        </button>
    )
}
