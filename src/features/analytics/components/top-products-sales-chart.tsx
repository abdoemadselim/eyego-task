"use client"

// Libs
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { useState } from "react"

// Shared
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/shared/components/ui/chart"

// Features
import { ProductType } from "@/features/products/types"

const chartConfig = {
    product_name: {
        label: "Product Name",
    },
    sales: {
        label: "Sales",
        color: "var(--chart-1)",
    },

} satisfies ChartConfig

export default function TopProductsSalesChart({ productsData, productsCount }: { productsData: Pick<ProductType, "product_name" | "sales">[], productsCount: number }) {
    const [chartData] = useState(() => {
        return productsData.sort((a, b) => b.sales - a.sales).slice(0, productsCount)
    })

    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle> Top Products Sales </CardTitle>
                <CardDescription> Showing the top {productsCount} products by sales </CardDescription>
            </CardHeader>
            <CardContent className="sm:px-6 px-2">
                <ChartContainer config={chartConfig} className="min-h-[200px] sm:max-w-full max-w-[220px]">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="product_name"
                            type="category"
                            tickLine={false}
                            tickMargin={5}
                            width={80}
                            axisLine={false}
                        />
                        <XAxis dataKey="sales" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="sales" fill="var(--color-chart-3)" layout="vertical" radius={5} className="max-w-full" />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="text-muted-foreground leading-none">
                    Showing the top {productsCount} products by sales
                </div>
            </CardFooter>
        </Card>
    )
}
