import {
  LayoutDashboard, FileText, BarChart3, LogOut, ExternalLink,
  Flag, UserPlus, Crown, Users, BookOpen, Waves, Lock,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import dageLogo from "@/assets/dage-logo.png";
import type { AdminTheme } from "./AdminLayout";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Waivers", url: "/admin/waivers", icon: FileText },
  { title: "Tracker", url: "/admin/tracker", icon: BarChart3 },
];

const lockedItems = [
  { title: "Parade Apps", icon: Flag },
  { title: "Volunteers", icon: UserPlus },
  { title: "Queen Court", icon: Crown },
  { title: "Advisory Board", icon: Users },
  { title: "Scholarships", icon: BookOpen },
  { title: "Swimming", icon: Waves },
];

export function AdminSidebar({ theme = "light" }: { theme?: AdminTheme }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const bg         = isDark ? "#130b1f" : "#ffffff";
  const border     = isDark ? "#2a1a42" : "#e2e8f0";
  const logoLabel  = isDark ? "#F2B705" : "#68258C";
  const labelMuted = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.35)";
  const navDefault = isDark ? "rgba(255,255,255,0.6)" : "#6b7280";
  const lockedClr  = isDark ? "rgba(255,255,255,0.2)" : "#d1d5db";
  const footerClr  = isDark ? "rgba(255,255,255,0.4)" : "#9ca3af";

  const navActiveClass = isDark
    ? "!text-[#F2B705] !bg-[#F2B705]/10 font-medium"
    : "!text-[#68258C] !bg-[#68258C]/10 font-medium";

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r"
      style={{ background: bg, borderColor: border, transition: "background 0.2s" }}
    >
      <SidebarHeader className="px-4 py-5" style={{ borderBottom: `1px solid ${border}` }}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <img src={dageLogo} alt="D.A.G.E." className="h-9 w-9 rounded-full object-cover ring-2"
              style={{ "--tw-ring-color": "#68258C" } as React.CSSProperties} />
            <div>
              <h2 className="text-sm font-heading font-bold tracking-wide" style={{ color: logoLabel }}>
                D.A.G.E.
              </h2>
              <p className="text-[10px] tracking-wider uppercase" style={{ color: labelMuted }}>
                Admin Portal
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img src={dageLogo} alt="D.A.G.E." className="h-8 w-8 rounded-full object-cover" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent style={{ background: bg }}>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-widest uppercase" style={{ color: labelMuted }}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors`}
                      style={{ color: navDefault }}
                      activeClassName={navActiveClass}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] tracking-widest uppercase" style={{ color: labelMuted }}>
              Coming Soon
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {lockedItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-default"
                      style={{ color: lockedClr }}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      <Lock className="h-3 w-3" />
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="space-y-1 pb-4" style={{ borderTop: `1px solid ${border}`, background: bg }}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => window.open("/", "_blank")} style={{ color: footerClr }}>
              <ExternalLink className="h-4 w-4" />
              {!collapsed && <span className="text-sm">View Site</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} style={{ color: footerClr }}
              className="hover:text-red-400 hover:bg-red-500/10">
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="text-sm">Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
