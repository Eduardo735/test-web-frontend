"use client";

import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { cn } from "@/app/lib/utils";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { UserNav } from "./user-nav";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export function SidebarPlus({
  collapsed,
  setCollapsed,
  activeItem,
  setActiveItem,
}: SidebarProps) {
  const menuItems = [
    { id: "social", label: "Social", icon: LayoutDashboard },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "setups", label: "Live Setups", icon: BarChart3 },
    { id: "academy", label: "Academia", icon: BarChart3 },
    { id: "community", label: "Community Pro", icon: BarChart3 },
    { id: "support", label: "Support", icon: BarChart3 },
  ];

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <Link
            href="/plus-home"
            className="flex items-center justify-center gap-2"
          >
            <span className="text-white font-bold text-lg pb-1">🐢</span>
            <span className="font-semibold">TurtleTrader</span>
            <Badge>PLUS Plan</Badge>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", collapsed && "mx-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeItem === item.id ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  collapsed ? "justify-center px-2" : "px-3"
                )}
                onClick={() => setActiveItem(item.id)}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    activeItem === item.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-2">
        <Separator className="my-2" />
        {collapsed ? (
          <div className="flex justify-center">
            <UserNav collapsed={collapsed} />
          </div>
        ) : (
          <UserNav collapsed={collapsed} />
        )}
      </div>
    </div>
  );
}
