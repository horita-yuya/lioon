import type { TranslationDict } from "lioon-core";
import { type PropsWithChildren, createContext, useContext } from "react";

type I18nContextValue = {
  translations: TranslationDict;
  locale: string | undefined;
};

const I18nContext = createContext<I18nContextValue>({
  translations: {
    default: {},
  },
  locale: undefined,
});

type I18nProviderProps<Locale extends string> = {
  translations: TranslationDict;
  locale?: Locale;
};

export function I18nProvider<Locale extends string>({
  children,
  translations,
  locale,
}: PropsWithChildren<I18nProviderProps<Locale>>) {
  return (
    <I18nContext.Provider
      value={{
        translations,
        locale,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext() {
  return useContext(I18nContext);
}
