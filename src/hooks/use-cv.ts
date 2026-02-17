import { useMemo, useCallback } from "react";
import { useCvContext } from "../context/cv-context";
import type { CvData } from "../types/cv";

export function useCv(cvId: string) {
  const { cvList, dispatch } = useCvContext();

  const cv = useMemo(
    () => cvList.find((item) => item.id === cvId),
    [cvList, cvId],
  );

  const updateCv = useCallback(
    (updated: CvData) => dispatch({ type: "UPDATE_CV", payload: updated }),
    [dispatch],
  );

  return { cv, updateCv };
}
