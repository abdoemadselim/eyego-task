// Features
import ProductsTable from "@/features/products/components/products-table";

export default function ProductsPage() {
    return (
        <div className="flex flex-col px-8">
            <h1 className="text-xl font-bold py-4">Products</h1>
            <ProductsTable />
        </div>
    )
}