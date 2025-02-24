import type { PropsWithChildren } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavigationSidebar from "./navigation";
import { Toaster } from "@/components/ui/sonner";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <NavigationSidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex px-3 py-2">
          <SidebarTrigger variant="outline" />
        </header>
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
};

export default Layout;
