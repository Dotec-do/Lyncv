import { useState, useId, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const { t } = useTranslation();
  const panelId = useId();

  return (
    <>
      {/* Mobile tab toggle */}
      <div role="tablist" className="flex md:hidden border-b border-slate-200 bg-white print:hidden">
        <button
          role="tab"
          aria-selected={activeTab === "edit"}
          aria-controls={`${panelId}-edit`}
          className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${activeTab === "edit" ? "border-b-2 border-emerald-600 text-emerald-600" : "text-slate-400 hover:text-slate-600"}`}
          onClick={() => setActiveTab("edit")}
        >
          {t("tabs.edit")}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "preview"}
          aria-controls={`${panelId}-preview`}
          className={`flex-1 py-3 text-sm font-medium transition-all duration-200 ${activeTab === "preview" ? "border-b-2 border-emerald-600 text-emerald-600" : "text-slate-400 hover:text-slate-600"}`}
          onClick={() => setActiveTab("preview")}
        >
          {t("tabs.preview")}
        </button>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex-1 overflow-auto">
        {activeTab === "edit"
          ? <div id={`${panelId}-edit`} role="tabpanel">{left}</div>
          : <div id={`${panelId}-preview`} role="tabpanel">{right}</div>
        }
      </div>

      {/* Desktop split */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-y-auto border-r border-slate-200">
          {left}
        </div>
        <div className="w-1/2 overflow-y-auto bg-slate-50">
          {right}
        </div>
      </div>
    </>
  );
}
