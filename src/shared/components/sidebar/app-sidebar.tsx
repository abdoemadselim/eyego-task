'use client'

// Libs
import { Book, ChevronUp, Loader2, LogOut, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"
import { useSelector } from "react-redux"

// Shared
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/shared/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import { RootState } from "@/store"

// Features
import { useLogoutMutation } from "@/features/auth/service"

// Menu items.
const items = [
    {
        title: "Products",
        url: "/dashboard/products",
        icon: <Book />,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const [logout] = useLogoutMutation()
    const { user, isLoading } = useSelector((state: RootState) => state.auth)

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-transparent"
                        >
                            <Link href="/" className="h-[50px]">
                                <Image
                                    src="/images/logo.webp"
                                    alt="EyeGo EyeGo AIoT Platform"
                                    width="45"
                                    height="45"
                                    fetchPriority="high"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="pt-6">
                <SidebarGroup >
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="pb-2">
                                    <SidebarMenuButton asChild className={`${pathname === item.url && "bg-primary text-white"} hover:bg-primary/90 transition-colors duration-60 ease-in-out hover:text-white`}>
                                        <Link href={item.url} className="flex items-center gap-4" >
                                            {item.icon}
                                            <span className="text-xl">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="text-lg">
                                    <User2 /> {user?.name}
                                    {isLoading ? <Loader2 className="ml-auto animate-spin" /> : <ChevronUp className="ml-auto" />}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                side="top"
                            >
                                <DropdownMenuItem className="flex items-center gap-6 w-full cursor-pointer" onClick={() => {
                                    logout().unwrap().then(() => {
                                        redirect("/auth/login")
                                    })
                                }}>
                                    <LogOut color="red" />
                                    <span className="text-red-500 hover:text-red-500 text-lg">Log out</span>

                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}