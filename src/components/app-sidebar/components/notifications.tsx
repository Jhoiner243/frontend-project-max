"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@clerk/clerk-react";
import { AlertTriangle, Bell, Info, ShoppingBasket, X } from "lucide-react";
import { JSX, useState } from "react";
import DeleteNotification from "../../../features/notifications/components/delete-notification";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "../../../features/notifications/service";

interface NotificationState {
  id: string;
  message: string;
  date: Date;
  color: string;
  icon: JSX.Element;
}

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const skip = !isSignedIn;
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetNotificationsQuery(undefined, { skip });
  const [onDeleteNotification] = useDeleteNotificationMutation();
  const enrichedNotifications: NotificationState[] =
    notifications?.map((notification) => {
      const colorMapping: Record<string, string> = {
        stock: "text-yellow-500",
        info: "text-blue-500",
        alert: "text-red-500",
      };

      const iconMapping: Record<string, JSX.Element> = {
        stock: <AlertTriangle />,
        info: <Info />,
        alert: <ShoppingBasket />,
      };

      const type = notification.message.includes("bajo de stock")
        ? "stock"
        : notification.message.includes("info")
        ? "info"
        : "alert";

      return {
        ...notification,
        date: notification.date, // Default date if missing
        color: colorMapping[type],
        icon: iconMapping[type],
      };
    }) || [];

  const handleDeleteNotification = (id: string) => {
    onDeleteNotification({ id: id });
    refetch();
  };
  return (
    <div className="relativ">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {enrichedNotifications.length > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </Button>

      {isOpen && (
        <Card className="absolute bg-white dark:bg-black right-15 mt-2 w-96 z-50 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Notificaciones
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-72 p-4">
              {isLoading ? (
                <p className="text-center text-sm text-muted-foreground">
                  Cargando notificaciones...
                </p>
              ) : enrichedNotifications.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No hay notificaciones.
                </p>
              ) : (
                enrichedNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className="mb-4 last:mb-0 border shadow-sm"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`${notification.color} p-2 rounded-full bg-opacity-10`}
                        >
                          <span className={`h-5 w-5 ${notification.color}`}>
                            {notification.icon}
                          </span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Notification alert
                          </p>
                          <p className="flex text-sm text-muted-foreground mr-1">
                            {notification.message}
                            <div className="m-auto">
                              <DeleteNotification
                                id={notification.id}
                                onDelete={handleDeleteNotification}
                              />
                            </div>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
