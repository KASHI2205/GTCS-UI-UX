
import { useState } from "react";
import { 
  Circle, 
  Search, 
  Settings, 
  Calendar, 
  FileText, 
  Bell,
  CheckCircle
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Circle },
  { title: "Regulatory Content", url: "/regulatory", icon: FileText },
  { title: "Compliance Screening", url: "/screening", icon: Search },
  { title: "Landed Cost Calculator", url: "/calculator", icon: Circle },
  { title: "License Management", url: "/licenses", icon: CheckCircle },
  { title: "System Integrations", url: "/integrations", icon: Settings },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `w-full justify-start ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"}`;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible>
      <SidebarContent className="bg-sidebar-background">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">G</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sidebar-foreground font-semibold text-lg">GTCC</h2>
                <p className="text-sidebar-foreground/70 text-xs">Trade Compliance</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls({ isActive: isActive(item.url) })}
                    >
                      <item.icon className="h-4 w-4 text-sidebar-foreground" />
                      {!collapsed && <span className="text-sidebar-foreground">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-2 text-sidebar-foreground/70 text-sm">
              <Bell className="h-4 w-4" />
              <span>3 Active Alerts</span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
