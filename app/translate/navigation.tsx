"use client";

import { Variable, Languages } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NavigationSidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = useMemo(() => {
    return [
      {
        title: "文本翻译",
        url: "/translate/articles",
        icon: Languages,
        isActive: pathname === "/translate/articles",
      },
      {
        title: "命名工具",
        url: "/translate/variables",
        icon: Variable,
        isActive: pathname === "/translate/variables",
      },
    ];
  }, [pathname]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>翻译工具集</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavigationSidebar;
