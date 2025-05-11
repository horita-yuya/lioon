import lioonNextPlugin from "@lioon/react/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = lioonNextPlugin({
  outputDir: "src/i18n",
  supportedLocales: ["en", "ja", "ko", "zh", "es"],
  // Optional: Custom translation function
  // staticTranslate: async (templates) => {
  //   return templates.map((template) => {
  //     return [template, { en: template, ja: template, ko: template, zh: template, es: template }]
  //   })
  // },
})({
  /* Other Next.js config options here */
});

export default nextConfig;
