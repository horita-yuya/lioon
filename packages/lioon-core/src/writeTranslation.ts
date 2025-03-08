import fs from "node:fs";
import path from "node:path";

export function writeTranslation(
  outputDir: string,
  values: Readonly<
    [template: string, translation: Readonly<{ [locale: string]: string }>]
  >[],
): void {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [template, translation] of values) {
    for (const locale of Object.keys(translation)) {
      const filePath = path.join(outputDir, `${locale}.json`);
      let translations: Record<string, string> = {};

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        translations = JSON.parse(content);
      }

      if (!translations[template]) {
        translations[template] = translation[locale];
      }

      fs.writeFileSync(
        filePath,
        JSON.stringify(translations, null, 2),
        "utf-8",
      );
    }
  }
}

export function extractI18nKey(template: string): string {
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
