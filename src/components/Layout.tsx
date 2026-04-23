import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center justify-end border-b border-border/40 px-2 sticky top-0 bg-background/80 backdrop-blur-md z-30">
            <SidebarTrigger className="mr-1" />
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <AppSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
