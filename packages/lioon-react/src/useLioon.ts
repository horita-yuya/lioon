import { BASE_LOCALE_NAME, type I18n, createI18n } from "@lioon/core";
import { useLioonContext } from "./LioonProvider.tsx";

export function useLioon<Locale extends string = string>(): {
  locale: Locale | typeof BASE_LOCALE_NAME;
  i18n: I18n;
} {
  const context = useLioonContext();
  const locale = context.locale ?? BASE_LOCALE_NAME;

  return {
    locale,
    i18n: createI18n(context.translations, locale),
  };
}
