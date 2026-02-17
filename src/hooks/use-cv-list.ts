import { useCallback } from "react";
import { useCvContext } from "../context/cv-context";
import type { CvData } from "../types/cv";
import type { TemplateId } from "../types/template";
import { createEmptyCv } from "../lib/constants";
import { generateId } from "../lib/id";

export function useCvList() {
  const { cvList, dispatch } = useCvContext();

  const addCv = useCallback(
    (name: string, templateId: TemplateId): CvData => {
      const cv = createEmptyCv(name, templateId);
      dispatch({ type: "ADD_CV", payload: cv });
      return cv;
    },
    [dispatch],
  );

  const deleteCv = useCallback(
    (id: string) => dispatch({ type: "DELETE_CV", payload: id }),
    [dispatch],
  );

  const duplicateCv = useCallback(
    (cv: CvData) =>
      dispatch({
        type: "DUPLICATE_CV",
        payload: { original: cv, newId: generateId() },
      }),
    [dispatch],
  );

  return { cvList, addCv, deleteCv, duplicateCv };
}
