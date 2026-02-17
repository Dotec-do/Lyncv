import { useReactToPrint } from "react-to-print";
import type { RefObject } from "react";

export function usePrintCv(contentRef: RefObject<HTMLDivElement | null>) {
  return useReactToPrint({
    contentRef,
    documentTitle: "CV",
  });
}
