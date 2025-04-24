import { getToken, messaging } from "@/firebase/firebase";
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
          console.log("✅ Token obtenido:", currentToken);
          // Aquí lo mandás a tu backend
          await createNotification({
            token: currentToken,
          }).unwrap();
        } else {
          console.warn("⚠️ No se pudo obtener el token");
        }
      } else {
        console.warn("❌ Permiso denegado para notificaciones");
      }
    } catch (err) {
      console.error("🔥 Error obteniendo token:", err);
    }
  };
  return { handleEnableNotification };
}
