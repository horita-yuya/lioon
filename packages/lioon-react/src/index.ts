import { type I18n, createI18n } from "lioon-core";
import { useContext } from "react";
import { I18nContext } from "./I18nProvider.tsx";

export { I18nProvider } from "./I18nProvider.tsx";
export { I18n } from "./I18n.tsx";

export function useI18n(): I18n {
  const context = useContext(I18nContext);

  return createI18n(context.translations, context.locale, context.keyPrefix);
}
