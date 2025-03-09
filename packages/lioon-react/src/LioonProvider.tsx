import { BASE_LOCALE_NAME, type TranslationDict } from "@lioon/core";
import { type PropsWithChildren, createContext, useContext } from "react";

export type DynamicTranslateFunction = (
  texts: string[],
) => Promise<{ original: string; translated: string }[]>;

type LioonContextValue<Locale extends string> = {
  translations: TranslationDict<Locale>;
  locale: Locale | undefined;
  dynamicTranslate: DynamicTranslateFunction | undefined;
};

const LioonContext = createContext<
  LioonContextValue<typeof BASE_LOCALE_NAME | string>
>({
  translations: {
    [BASE_LOCALE_NAME]: {},
  },
  locale: undefined,
  dynamicTranslate: undefined,
});

type LioonProviderProps<Locale extends string> = {
  translations: TranslationDict<Locale>;
  locale?: Locale;
  dynamicTranslate?: DynamicTranslateFunction;
};

export function LioonProvider<Locale extends string>({
  children,
  translations,
  locale,
  dynamicTranslate,
}: PropsWithChildren<LioonProviderProps<Locale>>) {
  return (
    <LioonContext.Provider
      value={
        {
          translations,
          locale,
          dynamicTranslate,
        } as LioonContextValue<Locale>
      }
    >
      {children}
    </LioonContext.Provider>
  );
}

export function useLioonContext() {
  return useContext(LioonContext);
}
