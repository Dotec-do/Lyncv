import { useReactToPrint } from "react-to-print";
import type { RefObject } from "react";

export function usePrintCv(contentRef: RefObject<HTMLDivElement | null>, documentTitle = "CV") {
  return useReactToPrint({
    contentRef,
    documentTitle,
  });
}
