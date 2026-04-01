import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PortalSidebar } from "./PortalSidebar";
import { useAuth } from "@/contexts/AuthContext";
import dageLogo from "@/assets/dage-logo.png";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || "Admin";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: "#0d0714" }}>
        <PortalSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <header
            className="h-16 flex items-center justify-between px-6 shrink-0"
            style={{ background: "#130b1f", borderBottom: "1px solid #2a1a42" }}
          >
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-white/50 hover:text-white hover:bg-white/10" />
              <div className="hidden sm:flex items-center gap-2.5">
                <img src={dageLogo} alt="D.A.G.E." className="h-8 w-8 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-heading font-semibold text-white/90">D.A.G.E. Admin</p>
                  <p className="text-[10px] text-white/35 tracking-wider uppercase">Krewe Management Portal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "#1c1130" }}>
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #68258C, #F2B705)" }}
              >
                {firstName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-white/70 hidden sm:block">{firstName}</span>
            </div>
          </header>

          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
