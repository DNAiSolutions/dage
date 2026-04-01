import {
  LayoutDashboard, FileText, BarChart3, LogOut, ExternalLink,
  Flag, UserPlus, Crown, Users, BookOpen, Waves, Lock,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import dageLogo from "@/assets/dage-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
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

export function PortalSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0"
      style={{ background: "#130b1f" }}
    >
      {/* Logo Header */}
      <SidebarHeader
        className="px-4 py-5"
        style={{ borderBottom: "1px solid #2a1a42" }}
      >
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <img
              src={dageLogo}
              alt="D.A.G.E."
              className="h-9 w-9 rounded-full object-cover ring-2"
              style={{ "--tw-ring-color": "#68258C" } as React.CSSProperties}
            />
            <div>
              <h2
                className="text-sm font-heading font-bold tracking-wide"
                style={{ color: "#F2B705" }}
              >
                D.A.G.E.
              </h2>
              <p className="text-[10px] text-white/40 tracking-wider uppercase">
                Krewe Portal
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={dageLogo}
              alt="D.A.G.E."
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent style={{ background: "#130b1f" }}>
        {/* Main Nav */}
        <SidebarGroup>
          <SidebarGroupLabel
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
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
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 transition-colors hover:text-white hover:bg-white/5"
                      activeClassName="!text-[#F2B705] !bg-[#F2B705]/10 font-medium"
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

        {/* Locked Modules */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Coming Soon
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {lockedItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <div
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-default"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
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

      <SidebarFooter
        className="space-y-1 pb-4"
        style={{ borderTop: "1px solid #2a1a42", background: "#130b1f" }}
      >
        <SidebarMenu>
          {/* View Site */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => window.open("/", "_blank")}
              className="text-white/40 hover:text-white/70 hover:bg-white/5"
            >
              <ExternalLink className="h-4 w-4" />
              {!collapsed && <span className="text-sm">View Site</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          {/* Sign Out */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="text-white/40 hover:text-red-400/80 hover:bg-red-400/5"
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="text-sm">Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
