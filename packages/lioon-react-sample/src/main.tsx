import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
// @ts-ignore
import "./index.css";

hydrateRoot(
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  document.getElementById("root")!,
  <StrictMode>
    <App />
  </StrictMode>,
);
