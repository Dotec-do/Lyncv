import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/editor")({
  component: EditorLayout,
});

function EditorLayout() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Outlet />
    </div>
  );
}
