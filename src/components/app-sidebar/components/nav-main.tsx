/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import FacturaDialog from "@/features/invoices/components/factura-dialog";
import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

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
  const isDesktop = useMediaQuery("(min-width: 1367px)");

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={() => {
                // Lógica invertida:
                // Si es desktop, abre el dialog.
                // Si no es desktop (pantalla pequeña), navega a la página.
                isDesktop ? setOpen(true) : navigate("second-page-facts");
              }}
              tooltip="Crear pedido"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              Crear pedido
            </SidebarMenuButton>
            <FacturaDialog open={open} setOpen={setOpen} />
            <Button
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0 bg-transparent"
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
                item.url === path.pathname
                  ? "rounded-full bg-accent text-accent-foreground shadow-md dark:bg-accent/50 dark:text-accent-foreground cursor-default"
                  : ""
              }`}
              key={item.title}
            >
              <Link to={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="hover:shadow-slate-800/40 hover:bg-slate-700/20 hover:rounded-full"
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
