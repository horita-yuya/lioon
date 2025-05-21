export type I18n = (
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) => string;

export type TranslationDict<Locale extends string> = {
  [locale in Locale]: {
    [key: string]: string;
  };
};

export const BASE_LOCALE_NAME = "base";

export function createI18n<Locale extends string>(
  translations: TranslationDict<Locale>,
  locale: Locale,
  callback?: (template: string) => void
): I18n {
  return (strings: TemplateStringsArray | string, ...values: unknown[]): string => {
    const template = typeof strings === "string" ? strings : strings.raw.join("{{}}").trim();
    const translatedTemplate = translations[locale]?.[template] || template;
    callback?.(template);
    return formatTemplateWithValues(translatedTemplate, values);
  };
}

function formatTemplateWithValues(template: string, values: unknown[]): string {
  const placeholders = template.split("{{}}");

  if (placeholders.length === 1) return template;

  let result = placeholders[0];
  for (let i = 0; i < Math.min(values.length, placeholders.length - 1); i++) {
    result += values[i] + placeholders[i + 1];
  }

  return result;
}
