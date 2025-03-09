import SamplePage from "@/pages/sample.tsx";
import { LioonProvider } from "@lioon/react";
import { useState } from "react";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import ja from "./i18n/ja.json";
import ko from "./i18n/ko.json";
import zh from "./i18n/zh.json";

type Locale = "en" | "ja" | "ko" | "zh" | "es";

export default function App() {
  const [locale, setLocale] = useState<"en" | "ja" | "ko" | "zh" | "es">("en");

  return (
    <LioonProvider
      translations={{ ja, en, ko, zh, es }}
      locale={locale}
      dynamicTranslate={async (texts) => {
        return await Promise.all(
          texts.map(async (text) => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if (text === "Test") {
              return {
                original: text,
                translated: "テスト",
              };
            } else if (text === "Hello") {
              return {
                original: text,
                translated: "こんにちは",
              };
            } else {
              return {
                original: text,
                translated: text,
              };
            }
          }),
        );
      }}
    >
      <SamplePage onClickLocale={(locale) => setLocale(locale as Locale)} />
    </LioonProvider>
  );
}
