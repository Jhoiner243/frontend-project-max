import { getToken, messaging } from "@/firebase/firebase";
import { toast } from "sonner";
import { VITE_VAPID_KEY } from "../../../config/config";
import { useCreateNotificationMutation } from "../service";

export default function useNotificationsHook() {
  const [createNotification] = useCreateNotificationMutation();

  const handleEnableNotification = async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const currentToken = await getToken(messaging, {
          vapidKey: VITE_VAPID_KEY,
        });

        if (currentToken) {
          await createNotification({
            token: currentToken,
          }).unwrap();
        } else {
          toast.error("No se pudo obtener el token");
        }
      } else {
        toast.info("❌ Permiso denegado para notificaciones");
      }
    } catch (err) {
      console.error("🔥 Error obteniendo token:", err);
    }
  };
  return { handleEnableNotification };
}
