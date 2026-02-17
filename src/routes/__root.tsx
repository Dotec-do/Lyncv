import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { CvProvider } from "../context/cv-context";
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
        <Outlet />
      </div>
    </CvProvider>
  );
}

function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-6xl font-bold text-slate-200">404</h1>
      <p className="text-slate-500">Page not found</p>
      <Link to="/" className="text-emerald-600 hover:underline">
        Back to Dashboard
      </Link>
    </div>
  );
}
