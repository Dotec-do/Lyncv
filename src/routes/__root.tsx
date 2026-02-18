import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CvProvider } from "../context/cv-context";
import { ErrorBoundary } from "../components/ui/error-boundary";
import { Navbar } from "../components/layout/navbar";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <CvProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <ErrorBoundary>
          <main id="main-content">
            <Outlet />
          </main>
        </ErrorBoundary>
      </div>
    </CvProvider>
  );
}

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-6xl font-bold text-slate-200">404</h1>
      <p className="text-slate-500">{t("errors.notFound")}</p>
      <Link to="/" className="text-emerald-600 hover:underline">
        {t("editor.backToDashboard")}
      </Link>
    </div>
  );
}
