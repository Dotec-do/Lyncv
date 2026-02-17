import { createContext, useContext, useReducer, useEffect, useRef, type ReactNode } from "react";
import type { CvData } from "../types/cv";
import { loadCvList, saveCvList } from "../services/storage.service";
import { nowISO } from "../lib/date";

interface CvState {
  cvList: CvData[];
}

type CvAction =
  | { type: "SET_LIST"; payload: CvData[] }
  | { type: "ADD_CV"; payload: CvData }
  | { type: "UPDATE_CV"; payload: CvData }
  | { type: "DELETE_CV"; payload: string }
  | { type: "DUPLICATE_CV"; payload: { original: CvData; newId: string } };

function cvReducer(state: CvState, action: CvAction): CvState {
  switch (action.type) {
    case "SET_LIST":
      return { cvList: action.payload };
    case "ADD_CV":
      return { cvList: [...state.cvList, action.payload] };
    case "UPDATE_CV":
      return {
        cvList: state.cvList.map((cv) =>
          cv.id === action.payload.id
            ? { ...action.payload, updatedAt: nowISO() }
            : cv,
        ),
      };
    case "DELETE_CV":
      return { cvList: state.cvList.filter((cv) => cv.id !== action.payload) };
    case "DUPLICATE_CV": {
      const { original, newId } = action.payload;
      const now = nowISO();
      const copy: CvData = {
        ...original,
        id: newId,
        name: `${original.name} (copy)`,
        createdAt: now,
        updatedAt: now,
      };
      return { cvList: [...state.cvList, copy] };
    }
    default:
      return state;
  }
}

interface CvContextValue {
  cvList: CvData[];
  dispatch: React.Dispatch<CvAction>;
}

const CvContext = createContext<CvContextValue | null>(null);

export function CvProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cvReducer, { cvList: [] });
  const initialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    dispatch({ type: "SET_LIST", payload: loadCvList() });
    initialized.current = true;
  }, []);

  // Persist to localStorage on changes (debounced)
  useEffect(() => {
    if (!initialized.current) return;
    const timeout = setTimeout(() => saveCvList(state.cvList), 500);
    return () => clearTimeout(timeout);
  }, [state.cvList]);

  return (
    <CvContext.Provider value={{ cvList: state.cvList, dispatch }}>
      {children}
    </CvContext.Provider>
  );
}

export function useCvContext(): CvContextValue {
  const ctx = useContext(CvContext);
  if (!ctx) throw new Error("useCvContext must be used within CvProvider");
  return ctx;
}
