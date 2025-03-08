import SamplePage from "@/pages/sample.tsx";
import { I18nProvider } from "lioon-react";
import { useState } from "react";
import en from "./i18n/en.json";
import es from "./i18n/es.json";
import ja from "./i18n/ja.json";
import ko from "./i18n/ko.json";
import zh from "./i18n/zh.json";

export default function App() {
  const [locale, setLocale] = useState<"en" | "ja" | "ko" | "zh" | "es">("en");
  
  const handleLocaleChange = () => {
    const locales: Array<"en" | "ja" | "ko" | "zh" | "es"> = ["en", "ja", "ko", "zh", "es"];
    const currentIndex = locales.indexOf(locale);
    const nextIndex = (currentIndex + 1) % locales.length;
    setLocale(locales[nextIndex]);
  };

  return (
    <I18nProvider translations={{ ja, en, ko, zh, es }} locale={locale}>
      <SamplePage onClickLocale={handleLocaleChange} />
    </I18nProvider>
  );
}
