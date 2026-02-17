import { useCallback } from "react";

// Reusable updater for array-based form sections
export function useArrayItemUpdate<T extends { id: string }>(
  items: T[],
  onChange: (items: T[]) => void,
) {
  return useCallback(
    (index: number, field: keyof T, value: T[keyof T]) => {
      const updated = [...items];
      updated[index] = { ...updated[index], [field]: value };
      onChange(updated);
    },
    [items, onChange],
  );
}
