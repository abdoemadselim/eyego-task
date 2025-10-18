'use client'

// Libs
import { useSearchParams } from "next/navigation";
import { AlertCircleIcon } from "lucide-react";

// Shared
import { PaginatedDataTable } from "@/shared/components/data-table/paginated-data-table";
import DataTableSkeleton from "@/shared/components/data-table/data-table-skeleton";
import { Alert, AlertTitle } from "@/shared/components/ui/alert";

// Features
import { ProductType } from "@/features/products/types";
import { columns } from "@/features/products/components";
import { useGetProductsQuery } from "@/features/products/service";

function ProductsTable() {
    // Get the page, pageSize params from the url
    const searchParams = useSearchParams()

    // Prepare the params for the query
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search");

    const { data, isError, isFetching, error } = useGetProductsQuery({ page: currentPage, page_size: pageSize, search })

    // Prepare the pagination state for tanstack table to work properly
    const paginationState = {
        pageIndex: currentPage - 1, // Why -1? Tanstack table is zero-indexed (so 1st page is 0 not 1)
        pageSize
    }

    // Handle loading state
    if (isFetching) {
        return <DataTableSkeleton />
    }

    return (
        <>
            {isError &&
                <Alert variant="destructive" className="w-fit px-6 mb-4">
                    <AlertCircleIcon />
                    <AlertTitle>{error?.root?.message}</AlertTitle>
                </Alert>
            }
            <PaginatedDataTable<ProductType>
                data={data?.products || []}
                total={data?.total || 0}
                pagination={paginationState} columns={columns}
            />
        </>
    )
}

export default ProductsTable;