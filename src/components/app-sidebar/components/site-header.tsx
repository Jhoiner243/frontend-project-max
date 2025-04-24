import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../../ui/mode-toogle";
import { Notifications } from "./notifications";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Notifications />
        </div>
      </div>
    </header>
  );
}
