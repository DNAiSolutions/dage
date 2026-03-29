import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PortalSidebar } from "./PortalSidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <PortalSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border bg-card px-4">
            <SidebarTrigger className="mr-4" />
            <span className="text-sm font-medium text-muted-foreground">Admin Portal</span>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
