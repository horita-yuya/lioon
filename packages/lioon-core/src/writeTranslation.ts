import fs from "node:fs";
import path from "node:path";

export interface WriteTranslationOptions {
  outputDir: string;
  defaultLocale: string;
  supportedLocales: string[];
}

export function writeTranslation(
  key: string,
  template: string,
  options: WriteTranslationOptions,
): void {
  const { outputDir, defaultLocale, supportedLocales } = options;

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Process each supported locale
  for (const locale of supportedLocales) {
    const filePath = path.join(outputDir, `${locale}.json`);
    let translations: Record<string, string> = {};

    // Load existing translations if file exists
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        translations = JSON.parse(content);
      } catch (error) {
        console.error(`Error reading translation file ${filePath}:`, error);
      }
    }

    if (!translations[key]) {
      translations[key] = locale === defaultLocale ? template : template;
    }

    // Write back to file
    try {
      fs.writeFileSync(
        filePath,
        JSON.stringify(translations, null, 2),
        "utf-8",
      );
    } catch (error) {
      console.error(`Error writing translation file ${filePath}:`, error);
    }
  }
}

export function extractI18nKey(template: string): string {
  // Replace template expressions with placeholder
  return template.replace(/\${[^}]+}/g, "{{}}").trim();
}

export function collectI18nKeys(code: string): string[] {
  const regex = /i18n`([^`]+)`/g;
  const keys: string[] = [];
  let match: RegExpMatchArray | null;

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((match = regex.exec(code)) !== null) {
    const key = extractI18nKey(match[1]);
    if (!keys.includes(key)) {
      keys.push(key);
    }
  }

  return keys;
}
