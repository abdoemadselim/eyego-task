'use client'

// Libs
import { useSearchParams } from "next/navigation";

// Shared
import { PaginatedDataTable } from "@/shared/components/data-table/paginated-data-table";

// Features
import { ProductType } from "@/features/products/types";
import { columns } from "@/features/products/components/data-table-cols-defs";
import { sampleProducts } from "@/features/products/service";

function ProductsTable() {
    // Get the page, pageSize params from the url
    const searchParams = useSearchParams()

    // Prepare the params for the query
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    // Prepare the pagination state for tanstack table to work properly
    const paginationState = {
        pageIndex: currentPage - 1, // Why -1? Tanstack table is zero-indexed (so 1st page is 0 not 1)
        pageSize
    }

    return (
        <PaginatedDataTable<ProductType>
            data={sampleProducts || []}
            total={sampleProducts?.length || 0}
            pagination={paginationState} columns={columns}
        />
    )
}

export default ProductsTable;