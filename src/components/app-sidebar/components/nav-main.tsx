"use client";

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import FacturaDialog from "@/features/invoices/components/factura-dialog";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const path = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={() => setOpen(true)}
              tooltip="Crear pedido"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              Crear pedido
            </SidebarMenuButton>
            <FacturaDialog open={open} setOpen={setOpen} />
            <Button
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
              onClick={() => navigate("/pedidos-register")}
            >
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              className={`${
                item.url === path.pathname &&
                "rounded-full bg-black/20  shadow-md shadow-slate-800/50 dark:rounded-full dark:bg-radial-[at_25%_25%] dark:from-transparent dark:via-black/75 dark:to-black/20 cursor-default"
              }`}
              key={item.title}
            >
              <Link to={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="hover:shadow-slate-800/40 hover:bg-black/40 hover:rounded-full"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
