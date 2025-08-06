"use client";
import {
  BarChartIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  FilesIcon,
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
import {
  SignedIn,
  useOrganization,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { motion } from "motion/react";
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

  // ————— Operaciones & Análisis —————
  navMain: [
    { title: "Ask AI", url: "/ask-llm", icon: Sparkles },
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
    { title: "Productos", url: "/productos", icon: ListIcon },
    { title: "Facturas", url: "/reportes", icon: ClipboardListIcon },
    { title: "Pedidos", url: "/pedidos-register", icon: FolderIcon },
    { title: "Clientes", url: "/clientes", icon: UsersIcon },
    { title: "Analíticas", url: "/analitics", icon: BarChartIcon },
  ],

  // ————— “Más…” (submenú colapsable) —————
  navClouds: [
    {
      title: "Más…",
      icon: FilesIcon, // un icono genérico de menú
      isActive: true,
      url: "#",
      items: [
        { title: "Capture", url: "#", items: [] },
        { title: "Proposal", url: "#", items: [] },
        { title: "Prompts", url: "#", items: [] },
      ],
    },
  ],

  // ————— Administración & Datos maestros —————
  documents: [
    {
      name: "Biblioteca de datos",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Categorías",
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
  const { organization } = useOrganization();

  const name = organization?.name;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <motion.a
                href="#"
                initial="hidden"
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <span className="text-base font-semibold">{name}.</span>
              </motion.a>
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
