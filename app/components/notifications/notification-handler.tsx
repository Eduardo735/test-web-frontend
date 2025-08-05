"use client";

import { messaging } from "@/app/lib/notifications/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

export function NotificationHandler() {
  useEffect(() => {
    if (!messaging) return;

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getToken(messaging, {
          vapidKey: "",
        }).then((currentToken) => {
          if (currentToken) {
            console.log("Token recibido:", currentToken);
          } else {
            console.warn("No se pudo obtener el token.");
          }
        });
      }
    });

    onMessage(messaging, (payload) => {
      console.log("Mensaje recibido en foreground:", payload);
    });
  }, []);

  return null;
}
