import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ContentProvider } from "./app/content/ContentContext.tsx";
import "./styles/index.css";

// The admin panel is a separate chunk, so visitors never download it.
const AdminApp = lazy(() => import("./admin/AdminApp.tsx"));
const isAdmin = location.pathname.replace(/\/+$/, "") === "/admin";

createRoot(document.getElementById("root")!).render(
  isAdmin ? (
    <Suspense fallback={null}>
      <AdminApp />
    </Suspense>
  ) : (
    <ContentProvider>
      <App />
    </ContentProvider>
  ),
);
