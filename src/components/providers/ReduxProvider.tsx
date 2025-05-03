"use client";
import { store } from "@/lib/redux/store";
import type { ReactNode } from "react";
import { Provider } from "react-redux";

export interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
