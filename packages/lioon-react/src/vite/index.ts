import { parseCode } from "@lioon/core";
import { writeTranslation } from "@lioon/core/plugin";
import path from "node:path";
import type { PluginOption } from "vite";

export type LioonVitePluginOptions<Locales extends string> = {
  outputDir: string;
  supportedLocales: Locales[];
  staticTranslate?: (
    templates: string[],
  ) => Promise<[template: string, { [locale in Locales]: string }][]>;
};

export default function lioonVitePlugin<Locales extends string>(
  options: LioonVitePluginOptions<Locales>,
): PluginOption {
  const { outputDir, supportedLocales, staticTranslate } = options;

  return {
    name: "vite-plugin-lioon",

    async transform(code, id) {
      if (
        !id.endsWith(".tsx") &&
        !id.endsWith(".ts") &&
        !id.endsWith(".jsx") &&
        !id.endsWith(".js")
      ) {
        return code;
      }

      const templates = parseCode(code).map((element) => element.template);

      if (templates.length > 0) {
        const projectRoot = process.cwd();
        const absoluteOutputDir = path.isAbsolute(outputDir)
          ? outputDir
          : path.join(projectRoot, outputDir);

        if (staticTranslate) {
          const translatedTemplates = await staticTranslate(templates);
          writeTranslation(absoluteOutputDir, translatedTemplates);
        } else {
          const defaultTemplates = templates.map((template) => {
            const supported = Object.fromEntries(
              supportedLocales.map((locale) => [locale, ""]),
            );
            return [template, { ...supported, base: template }] as const;
          });

          writeTranslation(absoluteOutputDir, defaultTemplates);
        }

        console.log(
          `[lioon] Extracted ${templates.length} i18n keys from ${path.relative(projectRoot, id)}`,
        );
      }

      return code;
    },
  };
}
