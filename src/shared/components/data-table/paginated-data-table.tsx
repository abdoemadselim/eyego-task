'use client'

// Libs
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

// Shared
import { Button } from "@/shared/components/ui/button"
import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Pagination, PaginationContent, PaginationItem } from "@/shared/components/ui/pagination"

export function PaginatedDataTable<T>({ data, total, pagination, columns }: { data: T[], total: number, pagination: { pageIndex: number, pageSize: number }, columns: ColumnDef<T>[] }) {
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1;
  const pathname = usePathname();
  const router = useRouter()

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  const setPageIndexUrl = (value: string) => {
    const newPageSize = Number(value)

    // Update the pageSize in table
    table.setPageSize(newPageSize)

    // Update the URL
    const params = new URLSearchParams(searchParams)
    params.set("pageSize", value)
    params.set("page", "1") // reset to page 1 when page size changes

    router.push(`${pathname}?${params.toString()}`)
  }

  // Tanstack starts here
  const table = useReactTable({
    data,
    columns: columns,
    rowCount: total,
    state: {
      pagination,
    },
    getRowId: (row: any) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
  })

  const pageSizes = Array.from({ length: Math.ceil(total / 10) }, (_, i) => (i + 1) * 10)

  return (
    <div
      className="relative flex flex-col gap-4 overflow-auto"
    >
      <div className="overflow-hidden rounded-lg border">
        <div
        >
          <Table className="bg-white">
            <TableHeader className="bg-primary-foreground sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan} className="text-start">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="relative data-[dragging=true]:z-10 data-[dragging=true]:opacity-80">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-xl"
                  >
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={setPageIndexUrl}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-fit items-center justify-center text-sm font-medium ">
          Page {table.getState().pagination.pageIndex + 1} of
          <span className="px-1">{table.getPageCount()} </span>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Pagination>
            <PaginationContent dir="ltr">
              {table.getCanPreviousPage() &&
                <PaginationItem>
                  <Button asChild className="cursor-pointer px-3 text-sm border-gray-300" variant="outline">
                    <Link href={createPageUrl(1)}>{'<<'}</Link>
                  </Button>
                </PaginationItem>
              }

              {table.getCanPreviousPage() &&
                <PaginationItem>
                  <Button asChild className="cursor-pointer px-3 text-sm border-gray-300" variant="outline">
                    <Link href={createPageUrl(currentPage - 1)} className="w-full block p-0">{'<'}</Link>
                  </Button>
                  <span className="sr-only">Previous page</span>
                </PaginationItem>
              }

              {
                [pagination.pageIndex, pagination.pageIndex + 1, pagination.pageIndex + 2].map((pageIndex) => {
                  return pageIndex < table.getPageCount() && (
                    <PaginationItem key={pageIndex}>
                      <Link
                        href={createPageUrl(pageIndex + 1)}
                        className={`px-3 ${pageIndex == pagination.pageIndex ? 'bg-primary text-white' : 'text-primary border-2'} rounded-sm text-lg cursor-pointer`}
                      >
                        {pageIndex + 1}
                      </Link>
                    </PaginationItem>
                  )
                })
              }

              {table.getCanNextPage() &&
                <PaginationItem>
                  <Button asChild className="cursor-pointer px-3 text-sm border-gray-300" variant="outline">
                    <Link href={createPageUrl(currentPage + 1)}>{'>'}</Link>
                  </Button>
                  <span className="sr-only">Next page</span>
                </PaginationItem>
              }
            </PaginationContent>
          </Pagination>
        </div>
      </div>

    </div>
  )
}