import {
  type I18nOptions,
  type I18nTagFunction,
  type TranslationDict,
  createI18n,
} from "lioon-core";
import { useContext } from "react";
import { I18nContext } from "./context";

export { I18nProvider } from "./context";
export type { I18nOptions, I18nTagFunction, TranslationDict };

export function useI18n(options: Partial<I18nOptions> = {}): I18nTagFunction {
  const context = useContext(I18nContext);

  if (!context) {
    return createI18n(options);
  }

  const { translations, locale, defaultLocale, isBuildMode } = context;

  return createI18n({
    translations,
    locale,
    defaultLocale,
    isBuildMode,
    ...options,
  });
}
