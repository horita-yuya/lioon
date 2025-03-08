import SamplePage from "@/pages/sample.tsx";
import { I18nProvider } from "lioon-react";
import { useState } from "react";
import en from "./i18n/en.json";
import ja from "./i18n/ja.json";

export default function App() {
  const [locale, setLocale] = useState<"en" | "ja">("en");

  return (
    <I18nProvider translations={{ ja, en }} locale={locale}>
      <SamplePage
        onClickLocale={() => {
          setLocale(locale === "en" ? "ja" : "en");
        }}
      />
    </I18nProvider>
  );
}
