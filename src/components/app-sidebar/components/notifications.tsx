"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@clerk/clerk-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Info,
  Package,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { type JSX, useEffect, useState } from "react";
import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "../../../features/notifications/service";

interface NotificationState {
  id: string;
  message: string;
  createdAt: Date;
  color: string;
  bgColor: string;
  icon: JSX.Element;
  type: "stock" | "earnings" | "info" | "alert";
  priority: "high" | "medium" | "low";
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const enrichedNotifications: NotificationState[] =
    notifications?.map((notification) => {
      let type: "stock" | "earnings" | "info" | "alert" = "info";
      let priority: "high" | "medium" | "low" = "medium";

      if (
        notification.message.includes("bajo de stock") ||
        notification.message.includes("stock")
      ) {
        type = "stock";
        priority = "high";
      } else if (
        notification.message.includes("Ganancia") ||
        notification.message.includes("venta")
      ) {
        type = "earnings";
        priority = "medium";
      } else if (
        notification.message.includes("info") ||
        notification.message.includes("información")
      ) {
        type = "info";
        priority = "low";
      } else {
        type = "alert";
        priority = "high";
      }

      const typeConfig = {
        stock: {
          color: "text-amber-600",
          bgColor: "bg-amber-50 dark:bg-amber-950/20",
          icon: <Package className="h-4 w-4" />,
        },
        earnings: {
          color: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-950/20",
          icon: <TrendingUp className="h-4 w-4" />,
        },
        info: {
          color: "text-blue-600",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          icon: <Info className="h-4 w-4" />,
        },
        alert: {
          color: "text-red-600",
          bgColor: "bg-red-50 dark:bg-red-950/20",
          icon: <AlertTriangle className="h-4 w-4" />,
        },
      };

      return {
        ...notification,
        createdAt: notification.createdAt,
        type,
        priority,
        ...typeConfig[type],
      };
    }) || [];

  const handleDeleteNotification = async (id: string) => {
    await onDeleteNotification({ id });
    refetch();
  };

  const unreadCount = enrichedNotifications.length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Notification Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 mt-2 z-50"
            >
              <Card className="w-96 shadow-xl border-0 bg-white dark:bg-black">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4 pt-4">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold">
                      Notificaciones
                    </CardTitle>
                    {unreadCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0.5"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close notifications"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-80">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                            className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                          />
                          Cargando notificaciones...
                        </div>
                      </div>
                    ) : enrichedNotifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-center px-4">
                        <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          No hay notificaciones nuevas
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {enrichedNotifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                          >
                            <div className="flex items-start gap-3 p-4">
                              <div
                                className={`${notification.bgColor} ${notification.color} p-2 rounded-lg flex-shrink-0`}
                              >
                                {notification.icon}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">
                                      {notification.type === "stock" &&
                                        "Stock Bajo"}
                                      {notification.type === "earnings" &&
                                        "Ganancias del Día"}
                                      {notification.type === "info" &&
                                        "Información"}
                                      {notification.type === "alert" &&
                                        "Alerta"}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                                      {notification.message}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950/20"
                                      onClick={() =>
                                        handleDeleteNotification(
                                          notification.id
                                        )
                                      }
                                      aria-label="Delete notification"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>

                  {enrichedNotifications.length > 0 && (
                    <div className="border-t border-gray-100 dark:border-gray-800 p-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => {
                          // Clear all notifications logic here
                          enrichedNotifications.forEach((n) =>
                            handleDeleteNotification(n.id)
                          );
                        }}
                      >
                        Marcar todas como leídas
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
