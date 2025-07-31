import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ToastProvider } from "@radix-ui/react-toast";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AppSidebar } from "../components/app-sidebar/app-sidebar";
import { SiteHeader } from "../components/app-sidebar/components/site-header";
import { ThemeProvider } from "../components/ui/theme-provider";

export default function Layout() {
  return (
    <ThemeProvider   defaultTheme="dark">
      <ToastProvider>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <div className="flex flex-1 flex-col">
              <SiteHeader />
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6">
                    <Outlet />
                    <Toaster />
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
