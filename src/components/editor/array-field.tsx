import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { IconButton } from "../ui/icon-button";

interface ArrayFieldProps<T> {
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addLabel?: string;
}

export function ArrayField<T>({ items, onAdd, onRemove, renderItem, addLabel = "Add item" }: ArrayFieldProps<T>) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="relative rounded-xl border border-slate-200 p-4 bg-slate-50/50">
          <div className="absolute right-2 top-2">
            <IconButton
              label="Remove"
              onClick={() => onRemove(index)}
              className="text-red-400 hover:text-red-600 hover:bg-red-50"
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            />
          </div>
          {renderItem(item, index)}
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={onAdd} className="w-full border border-dashed border-slate-300 hover:border-emerald-400 hover:text-emerald-600">
        + {addLabel}
      </Button>
    </div>
  );
}
