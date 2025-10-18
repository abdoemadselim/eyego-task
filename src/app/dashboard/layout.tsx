// Shared
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { SiteHeader } from "@/shared/components/ui/sidebar-trigger";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            } >
            <AppSidebar className="pt-4" />
            <SidebarInset className=" bg-primary/10">
                <SiteHeader />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
