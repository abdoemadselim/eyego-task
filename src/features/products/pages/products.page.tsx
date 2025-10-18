// Libs
import { Suspense } from "react";
import { DownloadIcon } from "lucide-react";

// Shared
import DataTableSkeleton from "@/shared/components/data-table/data-table-skeleton";
import { Button } from "@/shared/components/ui/button";

// Features
import { SearchInput } from "@/features/products/components";
import { ProductsTable } from "@/features/products/components";
import { ProductsExport } from "@/features/products/components";

export default function ProductsPage() {
    return (
        <div className="flex flex-col px-8 gap-4">
            <div className="flex sm:justify-between sm:items-center flex-col sm:flex-row items-start">
                <div className="flex sm:flex-row flex-col items-start sm:items-center sm:gap-8 w-full">
                    <h1 className="text-xl pt-2 font-bold sm:py-4">Products</h1>
                    <SearchInput />
                </div>

                <ProductsExport >
                    <Button className="px-2 py-2 border-1 bg-secondary text-black hover:bg-gray-200 cursor-pointer border-gray-300 gap-3">
                        <DownloadIcon />
                        <span>Export</span>
                    </Button>
                </ProductsExport >
            </div>
            <Suspense fallback={<DataTableSkeleton />}>
                <ProductsTable />
            </Suspense>
        </div>
    )
}