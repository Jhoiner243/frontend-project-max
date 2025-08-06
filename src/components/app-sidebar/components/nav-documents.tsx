"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Corrected import path
import {
  FolderIcon,
  LucideIcon,
  MoreHorizontalIcon,
  ShareIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const [open, setOpen] = useState(false);
  const [countTooltip, setCountTooltip] = useState<number | null>(null);
  const prevOpenRef = useRef(false); // Ref para rastrear el estado 'open' anterior

  // Leer la cantidad desde localStorage una sola vez al montar
  useEffect(() => {
    const stored = localStorage.getItem("countTooltipShown");
    const count = stored ? Number(stored) : 0;
    setCountTooltip(count);
  }, []);

  // Incrementar y guardar si el tooltip se abre y aún no ha llegado al límite
  useEffect(() => {
    const prevOpen = prevOpenRef.current;

    // Solo incrementar si el tooltip está transicionando de cerrado a abierto
    // y el contador es menor a 2
    if (!prevOpen && open && countTooltip !== null && countTooltip < 3) {
      const newCount = countTooltip + 1;
      setCountTooltip(newCount);
      localStorage.setItem("countTooltipShown", newCount.toString());
    }

    // Actualizar el ref para la próxima renderización
    prevOpenRef.current = open;
  }, [open, countTooltip]);

  const { isMobile } = useSidebar();
  const path = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.name}
            className={`${
              item.url === path.pathname &&
              "rounded-full bg-black/20 shadow-lg shadow-slate-800/20 dark:bg-radial-[at_25%_25%] dark:from-transparent dark:via-black/75 dark:to-black/20"
            }`}
          >
            <SidebarMenuButton asChild>
              <Link to={item.url}>
                <item.icon />
                {item.name === "Categorías" ? (
                  <Tooltip
                    open={
                      countTooltip !== null && countTooltip < 3 ? open : false
                    }
                    onOpenChange={setOpen}
                  >
                    <TooltipTrigger className="cursor-pointer">
                      <span>{item.name}</span>
                    </TooltipTrigger>
                    <TooltipContent align="start">
                      Categoría de productos
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span>{item.name}</span>
                )}
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="rounded-sm data-[state=open]:bg-accent"
                >
                  <MoreHorizontalIcon />
                  <span className="sr-only">Más</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon />
                  <span>Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontalIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
