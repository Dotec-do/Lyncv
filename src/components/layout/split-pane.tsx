import { useState, type ReactNode } from "react";

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  return (
    <>
      {/* Mobile tab toggle */}
      <div className="flex md:hidden border-b border-gray-200 bg-white print:hidden">
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "edit" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("edit")}
        >
          Edit
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === "preview" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex-1 overflow-auto">
        {activeTab === "edit" ? left : right}
      </div>

      {/* Desktop split */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-y-auto border-r border-gray-200">
          {left}
        </div>
        <div className="w-1/2 overflow-y-auto bg-gray-100">
          {right}
        </div>
      </div>
    </>
  );
}
