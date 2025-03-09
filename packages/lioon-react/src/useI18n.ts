import { type I18n, createI18n } from "@lioon/core";
import { useI18nContext } from "./I18nProvider.tsx";

export function useI18n(): { locale: string; i18n: I18n } {
  const context = useI18nContext();
  const locale = context.locale ?? "default";

  return {
    locale,
    i18n: createI18n(context.translations, locale),
  };
}
