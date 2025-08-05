// ✅ En lugar de usar `import`, usa `importScripts`
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "",
  authDomain: "turtles-internauta-capital.firebaseapp.com",
  projectId: "turtles-internauta-capital",
  messagingSenderId: "",
  appId: "",
});

self.addEventListener("push", function (event) {
  const payload = event.data?.json();
  console.log("[Service Worker] Push Received:", payload);

  const title = payload?.notification?.title || "Título por defecto";
  const options = {
    body: payload?.notification?.body || "Cuerpo por defecto",
    icon: "/icon.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
