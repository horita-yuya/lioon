import { BASE_LOCALE_NAME, type TranslationDict } from "@lioon/core";
import { type PropsWithChildren, createContext, useContext } from "react";

type LioonContextValue<Locale extends string> = {
  translations: TranslationDict<Locale>;
  locale: Locale | undefined;
};

const LioonContext = createContext<LioonContextValue<typeof BASE_LOCALE_NAME>>({
  translations: {
    [BASE_LOCALE_NAME]: {},
  },
  locale: undefined,
});

type LioonProviderProps<Locale extends string> = {
  translations: TranslationDict<Locale>;
  locale?: Locale;
};

export function LioonProvider<Locale extends string>({
  children,
  translations,
  locale,
}: PropsWithChildren<LioonProviderProps<Locale>>) {
  return (
    <LioonContext.Provider
      value={{
        // @ts-ignore
        translations,
        // @ts-ignore
        locale,
      }}
    >
      {children}
    </LioonContext.Provider>
  );
}

export function useLioonContext() {
  return useContext(LioonContext);
}
