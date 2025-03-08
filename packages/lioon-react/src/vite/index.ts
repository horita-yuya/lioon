import path from "node:path";
import { collectI18nKeys, writeTranslation } from "lioon-core";
import type { PluginOption } from "vite";

export interface LioonVitePluginOptions {
  outputDir?: string;
  defaultLocale?: string;
  supportedLocales?: string[];
}

export default function lioonVitePlugin(
  options: LioonVitePluginOptions = {},
): PluginOption {
  const {
    outputDir = "src/i18n",
    defaultLocale = "en",
    supportedLocales = ["en"],
  } = options;

  return {
    name: "vite-plugin-lioon",

    transform(code, id) {
      if (!id.endsWith(".tsx") && !id.endsWith(".ts") && !id.endsWith(".jsx"))
        return;

      const keys = collectI18nKeys(code);

      console.log(keys);
      if (keys.length > 0) {
        // Get absolute path for output directory based on project root
        const projectRoot = process.cwd();
        const absoluteOutputDir = path.isAbsolute(outputDir)
          ? outputDir
          : path.join(projectRoot, outputDir);

        for (const key of keys) {
          writeTranslation(key, key, {
            outputDir: absoluteOutputDir,
            defaultLocale,
            supportedLocales,
          });
        }

        console.log(
          `[lioon] Extracted ${keys.length} i18n keys from ${path.relative(projectRoot, id)}`,
        );
      }

      return code;
    },
  };
}
