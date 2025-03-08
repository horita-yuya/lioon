import { I18nProvider } from "lioon-react";
import SamplePage from "./pages/sample.tsx";

export default function App() {
  return (
    <I18nProvider translations={{ default: {} }}>
      <div>Hello</div>
      <SamplePage />
    </I18nProvider>
  );
}
