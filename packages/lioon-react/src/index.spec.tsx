import { render, screen } from "@testing-library/react";
import type { TranslationDict } from "lioon-core";
import React from "react";
import { describe, expect, it } from "vitest";
import { I18nProvider, useI18n } from "./index";

// Component name will be used as part of the translation key
function TestComponent({ name }: { name?: string }) {
  // Pass component name to i18n for better translation key generation
  const i18n = useI18n({ componentName: "TestComponent" });
  const count = 3;
  const user = name || "Guest";

  return (
    <div>
      <div data-testid="greeting">{i18n`Hello, World!`}</div>
      <div data-testid="count">{i18n`There are ${count} trees`}</div>
      <div data-testid="welcome">{i18n`Welcome ${user}!`}</div>
    </div>
  );
}

describe("useI18n", () => {
  it("should return original text when no translation is available", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("greeting").textContent).toBe("Hello, World!");
    expect(screen.getByTestId("count").textContent).toBe("There are 3 trees");
    expect(screen.getByTestId("welcome").textContent).toBe("Welcome Guest!");
  });

  it("should return translated text when translation is available", () => {
    const translations: TranslationDict = {
      "TestComponentHello, World!": {
        en: "Hello, World!",
        ja: "こんにちは、世界！",
      },
      "TestComponentThere are {{}} trees": {
        en: "There are {{}} trees",
        ja: "木が {{}} 本あります",
      },
      "TestComponentWelcome {{}}!": {
        en: "Welcome {{}}!",
        ja: "ようこそ、{{}}さん！",
      },
    };

    render(
      <I18nProvider translations={translations} locale="ja" defaultLocale="en">
        <TestComponent name="Alice" />
      </I18nProvider>,
    );

    expect(screen.getByTestId("greeting").textContent).toBe(
      "こんにちは、世界！",
    );
    expect(screen.getByTestId("count").textContent).toBe("木が 3 本あります");
    expect(screen.getByTestId("welcome").textContent).toBe(
      "ようこそ、Aliceさん！",
    );
  });

  it("should fallback to default locale if translation not found in current locale", () => {
    const translations: TranslationDict = {
      "TestComponentHello, World!": {
        ja: "こんにちは、世界！",
      },
      "TestComponentWelcome {{}}!": {
        ja: "ようこそ、{{}}さん！",
      },
    };

    render(
      <I18nProvider translations={translations} locale="fr" defaultLocale="ja">
        <TestComponent name="Bob" />
      </I18nProvider>,
    );

    expect(screen.getByTestId("greeting").textContent).toBe(
      "こんにちは、世界！",
    );
    expect(screen.getByTestId("welcome").textContent).toBe(
      "ようこそ、Bobさん！",
    );
  });

  it("should override context settings with component options", () => {
    const translations: TranslationDict = {
      "CustomComponentHello, World!": {
        en: "Hello from custom component!",
      },
      "TestComponentHello, World!": {
        en: "Hello from test component!",
      },
    };

    function CustomComponent() {
      const i18n = useI18n({ componentName: "CustomComponent" });
      return <div data-testid="custom">{i18n`Hello, World!`}</div>;
    }

    render(
      <I18nProvider translations={translations} locale="en">
        <TestComponent />
        <CustomComponent />
      </I18nProvider>,
    );

    expect(screen.getByTestId("greeting").textContent).toBe(
      "Hello from test component!",
    );
    expect(screen.getByTestId("custom").textContent).toBe(
      "Hello from custom component!",
    );
  });

  it("should use build mode when specified", () => {
    render(
      <I18nProvider isBuildMode={true}>
        <TestComponent />
      </I18nProvider>,
    );

    expect(screen.getByTestId("greeting").textContent).toBe("Hello, World!");
    expect(screen.getByTestId("count").textContent).toBe("There are 3 trees");
  });
});
