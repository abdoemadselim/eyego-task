// Shared
import { AppSidebar } from "@/shared/components/layout/app-sidebar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { SidebarHeader } from "@/shared/components/layout/sidebar-header";

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
            <main className="bg-primary/10 w-full">
                <SidebarHeader />
                {children}
            </main>
        </SidebarProvider>
    );
}
