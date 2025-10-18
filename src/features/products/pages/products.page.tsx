// Features
import { SearchInput } from "@/features/products/components";
import { ProductsTable } from "@/features/products/components";

export default function ProductsPage() {
    return (
        <div className="flex flex-col px-8 gap-4">
            <div className="flex sm:flex-row flex-col items-start sm:items-center sm:gap-8 w-full">
                <h1 className="text-xl pt-2 font-bold sm:py-4">Products</h1>
                <SearchInput />
            </div>
            <ProductsTable />
        </div>
    )
}