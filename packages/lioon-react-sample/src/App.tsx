import { I18nProvider } from "lioon-react";
import { useState } from "react";
import en from "./generated/i18n/en.json";
import ja from "./generated/i18n/ja.json";
import SamplePage from "./pages/sample.tsx";

export default function App() {
  const [locale, setLocale] = useState<"en" | "ja">("en");

  return (
    <I18nProvider translations={{ ja, en }} locale={locale}>
      <div>Hello</div>
      <SamplePage
        onClickLocale={() => {
          setLocale(locale === "en" ? "ja" : "en");
        }}
      />
    </I18nProvider>
  );
}
