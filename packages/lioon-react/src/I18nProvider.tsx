import type { TranslationDict } from "lioon-core";
import React, { createContext, type ReactNode } from "react";

export interface I18nContextValue {
  translations: TranslationDict;
  locale: string;
  keyPrefix: string;
}

export const I18nContext = createContext<I18nContextValue>({
  translations: {},
  locale: "en",
  keyPrefix: "",
});

export interface I18nProviderProps {
  children: ReactNode;
  translations?: TranslationDict;
  locale?: string;
  defaultLocale?: string;
  isBuildMode?: boolean;
}

export function I18nProvider({
  children,
  translations = {},
  locale = "en",
}: I18nProviderProps) {
  const contextValue: I18nContextValue = {
    translations,
    locale,
    keyPrefix: "",
  };

  return (
    <I18nContext.Provider value={contextValue}>{children}</I18nContext.Provider>
  );
}
