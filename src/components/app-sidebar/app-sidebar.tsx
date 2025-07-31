"use client";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  Settings,
  Sparkles,
  UsersIcon,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useWindowSize } from "usehooks-ts";
import { Card } from "../ui/card";
import { NavDocuments } from "./components/nav-documents";
import { NavMain } from "./components/nav-main";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Ask AI",
      url: "/ask-llm",
      icon: Sparkles,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Productos",
      url: "/productos",
      icon: ListIcon,
    },
    {
      title: "Analiticas",
      url: "/analitics",
      icon: BarChartIcon,
    },
    {
      title: "Pedidos",
      url: "/pedidos-register",
      icon: FolderIcon,
    },
    {
      title: "Clientes",
      url: "/clientes",
      icon: UsersIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: FileCodeIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],

  documents: [
    {
      name: "Librería de datos",
      url: "/libreria-datos",
      icon: DatabaseIcon,
    },
    {
      name: "Facturas",
      url: "/reportes",
      icon: ClipboardListIcon,
    },
    {
      name: "Categorias",
      url: "/categorias",
      icon: FileIcon,
    },
    {
      name: "Configuración",
      url: "/settings",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { width } = useWindowSize();
  const { user } = useUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">FillStep.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>
        {width > 768 && (
          <SignedIn>
            <Card className="p-0 dark:hover:bg-slate-800/10 border-white/25 hover:cursor-default opacity-90">
              <div className="flex flex-row gap-1 items-center justify-center ">
                <UserButton />
                {user && (
                  <div>
                    <div className="p-2 dark:text-white/60">
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </SignedIn>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
