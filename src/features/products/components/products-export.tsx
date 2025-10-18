'use client'

// Libs
import { FileIcon } from "lucide-react";
import { FileXIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// Shared
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";
import { openToaster } from "@/shared/components/ui/sonner";

// Features
import { useGetProductsQuery } from "@/features/products/service";
import { handlePdfExport, handleXlsxExport } from "@/features/products/utils";

export default function ProductsExport({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams()
    const [isExporting, setIsExporting] = useState(false)

    // Get current filters
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    // Fetch ALL products with current filters
    // Use skip: true to prevent automatic fetching, only fetch when needed
    const { refetch } = useGetProductsQuery({
        page: 1,
        page_size: 10000, // Large number to get all products
        search,
        sort_by: sortBy,
        sort_order: sortOrder
    })

    const handleExport = async (exportType: 'pdf' | 'xlsx') => {
        setIsExporting(true)
        try {
            const result = await refetch()
            const products = result.data?.products || [];

            // Use generic export functions with product config
            if (exportType === 'pdf') {
                await handlePdfExport(products)
            } else if (exportType === 'xlsx') {
                await handleXlsxExport(products)
            }
        } catch (error) {
            console.error('Export failed:', error)
            openToaster('Export failed', 'error');
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isExporting}>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem variant="default" className="cursor-pointer bg-secondary justify-start text-gray-700 hover:bg-gray-200 " asChild>
                    <Button
                        className="w-full text-start"
                        onClick={() => handleExport('pdf')}
                        disabled={isExporting}
                    >
                        <FileIcon />
                        <span>{isExporting ? 'Exporting...' : 'PDF'}</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem variant="default" className="cursor-pointer bg-secondary justify-start text-gray-700 hover:bg-gray-200 " asChild>
                    <Button
                        className="w-full text-start"
                        onClick={() => handleExport('xlsx')}
                        disabled={isExporting}
                    >
                        <FileXIcon />
                        <span>{isExporting ? 'Exporting...' : 'Excel'}</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
