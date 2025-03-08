import type { PluginOption } from "vite";

export default function lioonVitePlugin(): PluginOption {
  return {
    name: "vite-plugin-lioon",
    transform(code, id) {
      if (!id.endsWith(".tsx") && !id.endsWith(".ts")) return;

      const regex = /i18n`([^`]+)`/g;
      const keys: string[] = [];
      let match: RegExpMatchArray | null;

      while (true) {
        match = regex.exec(code);

        if (match) {
          keys.push(match[1].replace(/\${[^}]+}/g, "{}"));
        } else {
          break;
        }
      }

      if (keys.length > 0) {
        console.log("Extracted i18n keys:", keys);
      }

      return code;
    },
  };
}
