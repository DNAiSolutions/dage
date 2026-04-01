import { useState, createContext, useContext } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import dageLogo from "@/assets/dage-logo.png";
import { Sun, Moon } from "lucide-react";

export type AdminTheme = "light" | "dark";

export const AdminThemeContext = createContext<AdminTheme>("light");
export const useAdminTheme = () => useContext(AdminThemeContext);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || "Admin";
  const [theme, setTheme] = useState<AdminTheme>("light");
  const isDark = theme === "dark";

  const pageBg    = isDark ? "#0d0714" : "#f8f9fa";
  const headerBg  = isDark ? "#130b1f" : "#ffffff";
  const headerBdr = isDark ? "#2a1a42" : "#e2e8f0";
  const textPri   = isDark ? "rgba(255,255,255,0.9)" : "#1e293b";
  const textSec   = isDark ? "rgba(255,255,255,0.6)" : "#64748b";
  const avatarPill= isDark ? "#1c1130" : "#f1f5f9";
  const toggleBg  = isDark ? "#1c1130" : "#f1f5f9";
  const toggleClr = isDark ? "#F2B705" : "#68258C";

  return (
    <AdminThemeContext.Provider value={theme}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full" style={{ background: pageBg, transition: "background 0.2s" }}>
          <AdminSidebar theme={theme} />
          <div className="flex-1 flex flex-col min-w-0">
            <header
              className="h-16 flex items-center justify-between px-6 shrink-0"
              style={{ background: headerBg, borderBottom: `1px solid ${headerBdr}`, transition: "background 0.2s" }}
            >
              <div className="flex items-center gap-3">
                <SidebarTrigger style={{ color: textSec }} />
                <div className="hidden sm:flex items-center gap-2.5">
                  <img src={dageLogo} alt="D.A.G.E." className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-heading font-semibold" style={{ color: textPri }}>D.A.G.E. Admin</p>
                    <p className="text-[10px] tracking-wider uppercase" style={{ color: textSec }}>Krewe Management Portal</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: toggleBg, color: toggleClr }}
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: avatarPill }}>
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #68258C, #F2B705)" }}
                  >
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm hidden sm:block" style={{ color: textSec }}>{firstName}</span>
                </div>
              </div>
            </header>
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </AdminThemeContext.Provider>
  );
}
