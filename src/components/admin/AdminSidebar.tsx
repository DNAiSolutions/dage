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

export function AdminSidebar() {
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
      className="border-r"
      style={{ background: "#ffffff", borderColor: "#e2e8f0" }}
    >
      <SidebarHeader
        className="px-4 py-5"
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <img
              src={dageLogo}
              alt="D.A.G.E."
              className="h-9 w-9 rounded-full object-cover ring-2"
              style={{ ringColor: "#68258C" }}
            />
            <div>
              <h2
                className="text-sm font-heading font-bold tracking-wide"
                style={{ color: "#68258C" }}
              >
                D.A.G.E.
              </h2>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase">
                Admin Portal
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

      <SidebarContent style={{ background: "#ffffff" }}>
        <SidebarGroup>
          <SidebarGroupLabel
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(0,0,0,0.35)" }}
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
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-500 transition-colors hover:text-gray-900 hover:bg-gray-100"
                      activeClassName="!text-[#68258C] !bg-[#68258C]/10 font-medium"
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
            <SidebarGroupLabel
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "rgba(0,0,0,0.3)" }}
            >
              Coming Soon
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {lockedItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm cursor-default text-gray-300">
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
        style={{ borderTop: "1px solid #e2e8f0", background: "#ffffff" }}
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => window.open("/", "_blank")}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <ExternalLink className="h-4 w-4" />
              {!collapsed && <span className="text-sm">View Site</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50"
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
