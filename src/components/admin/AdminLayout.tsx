import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";
import dageLogo from "@/assets/dage-logo.png";
import { Sun, Moon } from "lucide-react";

export type AdminTheme = "light" | "dark";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { profile } = useAuth();
  const firstName = profile?.full_name?.split(" ")[0] || "Admin";
  const [theme, setTheme] = useState<AdminTheme>("light");

  const isDark = theme === "dark";

  const bg = isDark ? "#0f0f0f" : "#f8f9fa";
  const headerBg = isDark ? "#1a1a1a" : "#ffffff";
  const headerBorder = isDark ? "#2a2a2a" : "#e2e8f0";
  const textPrimary = isDark ? "#f1f5f9" : "#1e293b";
  const textSecondary = isDark ? "#94a3b8" : "#64748b";

  return (
    <AdminThemeContext.Provider value={theme}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full" style={{ background: bg, transition: "background 0.2s" }}>
          <AdminSidebar theme={theme} />
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar */}
            <header
              className="h-16 flex items-center justify-between px-6 shrink-0"
              style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}`, transition: "background 0.2s" }}
            >
              <div className="flex items-center gap-3">
                <SidebarTrigger
                  className="hover:bg-gray-100"
                  style={{ color: textSecondary }}
                />
                <div className="hidden sm:flex items-center gap-2.5">
                  <img src={dageLogo} alt="D.A.G.E." className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-heading font-semibold" style={{ color: textPrimary }}>D.A.G.E. Admin</p>
                    <p className="text-[10px] tracking-wider uppercase" style={{ color: textSecondary }}>Krewe Management Portal</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Theme toggle */}
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className="h-8 w-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isDark ? "#2a2a2a" : "#f1f5f9",
                    color: isDark ? "#F2B705" : "#68258C",
                  }}
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                {/* User avatar */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: isDark ? "#2a2a2a" : "#f1f5f9" }}>
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #68258C, #F2B705)" }}
                  >
                    {firstName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm hidden sm:block" style={{ color: textSecondary }}>{firstName}</span>
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

import { createContext, useContext } from "react";
export const AdminThemeContext = createContext<AdminTheme>("light");
export const useAdminTheme = () => useContext(AdminThemeContext);
