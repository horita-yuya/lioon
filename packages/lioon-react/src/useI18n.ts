import { type I18n, createI18n } from "lioon-core";
import { useI18nContext } from "./I18nProvider.tsx";

export function useI18n(): { i18n: I18n } {
  const context = useI18nContext();

  return {
    i18n: createI18n(context.translations, context.locale ?? "default"),
  };
}
