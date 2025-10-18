// Features
import { SearchInput } from "@/features/products/components";
import { ProductsTable } from "@/features/products/components";

export default function ProductsPage() {
    return (
        <div className="flex flex-col px-8">
            <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold py-4">Products</h1>
                <SearchInput />
            </div>
            <ProductsTable />
        </div>
    )
}