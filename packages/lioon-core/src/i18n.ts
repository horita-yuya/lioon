export type I18n = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => string;

export interface TranslationDict {
  [key: string]: {
    [locale: string]: string;
  };
}

export interface I18nOptions {
  translations?: TranslationDict;
  locale?: string;
  defaultLocale?: string;
  componentName?: string;
  isBuildMode: boolean;
}

export function createI18n(options: I18nOptions): I18n {
  const {
    translations = {},
    locale = "en",
    defaultLocale = "ja",
    componentName = "Unknown",
    isBuildMode = false,
  } = options;

  const collectedTranslations: TranslationDict = {};

  return (strings: TemplateStringsArray, ...values: unknown[]): string => {
    const key = createKey(componentName, strings);

    if (isBuildMode) {
      if (!collectedTranslations[key]) {
        collectedTranslations[key] = {
          [defaultLocale]: strings.raw.join("{{}}"),
        };
      }
      return formatOriginalText(strings, values);
    } else {
      const translatedTemplate =
        translations[key]?.[locale] ||
        translations[key]?.[defaultLocale] ||
        strings.raw.join("{{}}");

      return formatTemplateWithValues(translatedTemplate, values);
    }
  };
}

function createKey(
  componentName: string,
  strings: TemplateStringsArray,
): string {
  return `${componentName}${strings.raw.join("{{}}").trim()}`;
}

function formatOriginalText(
  strings: TemplateStringsArray,
  values: unknown[],
): string {
  if (values.length === 0) return strings[0];

  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += values[i] + strings[i + 1];
  }

  return result;
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

export function useI18n(options: I18nOptions): I18n {
  return createI18n(options);
}
