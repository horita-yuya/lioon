export type I18n = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => string;

export type TranslationDict<Locale extends string> = {
  [locale in Locale]: {
    [key: string]: string;
  };
};

export function createI18n<Locale extends string>(
  translations: TranslationDict<Locale>,
  locale: Locale,
): I18n {
  return (strings: TemplateStringsArray, ...values: unknown[]): string => {
    const template = strings.raw.join("{{}}").trim();
    const translatedTemplate = translations[locale]?.[template] || template;
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
