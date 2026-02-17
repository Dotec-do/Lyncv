import { createRootRoute, Outlet } from "@tanstack/react-router";
import { CvProvider } from "../context/cv-context";
import { Navbar } from "../components/layout/navbar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <CvProvider>
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <Outlet />
      </div>
    </CvProvider>
  );
}
