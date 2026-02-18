import { Component, type ReactNode, type ErrorInfo } from "react";
import i18next from "i18next";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <h1 className="text-xl font-semibold text-slate-800">{i18next.t("errors.somethingWrong")}</h1>
            <p className="text-slate-500">{i18next.t("errors.refreshPage")}</p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              {i18next.t("actions.tryAgain")}
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
