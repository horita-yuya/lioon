import { parseCode } from "@lioon/core";
import { writeTranslation } from "@lioon/core/plugin";
import type { NextConfig } from "next";
import fs from "node:fs";


export type LioonNextPluginOptions<Locales extends string> = {
  outputDir: string;
  supportedLocales: Locales[];
  staticTranslate?: (
    templates: string[],
  ) => Promise<[template: string, { [locale in Locales]: string }][]>;
};

export default function lioonNextPlugin<Locales extends string>(
  options: LioonNextPluginOptions<Locales>,
): (nextConfig: NextConfig) => NextConfig {
  const { outputDir, supportedLocales, staticTranslate } = options;

  return (nextConfig: NextConfig) => {
    return {
      ...nextConfig,
      onDemandEntries: {
        ...nextConfig.onDemandEntries,
        maxInactiveAge: 60 * 60 * 1000,
      },
      webpack: (config, options) => {
        const { dev, isServer } = options;

        // Only run in development and on the client to avoid duplicates
        if (dev && !isServer) {
          config.module.rules.push({
            test: /\.(tsx|ts|jsx|js)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  plugins: [
                    {
                      visitor: {
                        Program: {
                          exit(path) {
                            const code = path.hub.getCode();
                            const filename = path.hub.file.opts.filename;

                            const templates = parseCode(code).map((element) => element.template);

                            if (templates.length > 0) {
                              const projectRoot = process.cwd();
                              const absoluteOutputDir = path.isAbsolute(outputDir)
                                ? outputDir
                                : path.join(projectRoot, outputDir);

                              // Ensure output directory exists
                              if (!fs.existsSync(absoluteOutputDir)) {
                                fs.mkdirSync(absoluteOutputDir, { recursive: true });
                              }

                              (async () => {
                                try {
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
                                    `[lioon] Extracted ${templates.length} i18n keys from ${
                                      filename ? path.relative(projectRoot, filename) : "unknown file"
                                    }`,
                                  );
                                } catch (error) {
                                  console.error("[lioon] Error processing i18n keys:", error);
                                }
                              })();
                            }
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          });
        }

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }
        return config;
      },
    };
  };
}
