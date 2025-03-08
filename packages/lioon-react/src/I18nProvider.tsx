import type { TranslationDict } from "lioon-core";
import { type PropsWithChildren, createContext, useContext } from "react";

type I18nContextValue<Locale extends string> = {
  translations: TranslationDict<Locale>;
  locale: Locale | undefined;
};

const I18nContext = createContext<I18nContextValue<"default">>({
  translations: {
    default: {},
  },
  locale: undefined,
});

type I18nProviderProps<Locale extends string> = {
  translations: TranslationDict<Locale>;
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
        // @ts-ignore
        translations,
        // @ts-ignore
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
