import { Info, Truck, CreditCard, RotateCcw, Tag, HelpCircle, Star, Store } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Sklep", url: "/", icon: Store },
  { title: "O sklepie", url: "/o-sklepie", icon: Info },
  { title: "Dostawa", url: "/dostawa", icon: Truck },
  { title: "Płatność", url: "/platnosc", icon: CreditCard },
  { title: "Zwroty i wymiany", url: "/zwroty", icon: RotateCcw },
  { title: "Zasady promocji", url: "/promocje", icon: Tag },
  { title: "Najczęstsze pytania", url: "/faq", icon: HelpCircle },
  { title: "Opinie klientów", url: "/opinie", icon: Star },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-4 py-5 border-b border-sidebar-border">
        {!collapsed && (
          <span className="font-display text-xl">
            Maison<span className="text-gold">.</span>
          </span>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Informacje</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-gold font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
