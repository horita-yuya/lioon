import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DynamicI18n } from "./DynamicI18n";
import { LioonProvider } from "./LioonProvider";

describe("DynamicI18n", () => {
  it("renders the original text while loading", () => {
    const mockDynamicTranslate = vi.fn().mockResolvedValue({
      text: "Hello",
      translated: "こんにちは",
    });

    render(
      <LioonProvider
        translations={{ base: {}, ja: {} }}
        locale="ja"
        supportedLocales={["ja"]}
        dynamicTranslate={mockDynamicTranslate}
      >
        <DynamicI18n render={<div data-testid="dynamic-text" />}>
          Hello
        </DynamicI18n>
      </LioonProvider>
    );

    expect(screen.getByTestId("dynamic-text").textContent).toBe("Hello");
    expect(mockDynamicTranslate).toHaveBeenCalledWith("Hello");
  });

  it("updates with translated text after loading", async () => {
    const mockDynamicTranslate = vi.fn().mockResolvedValue({
      text: "Hello",
      translated: "こんにちは",
    });

    render(
      <LioonProvider
        translations={{ base: {}, ja: {} }}
        locale="ja"
        supportedLocales={["ja"]}
        dynamicTranslate={mockDynamicTranslate}
      >
        <DynamicI18n render={<div data-testid="dynamic-text" />}>
          Hello
        </DynamicI18n>
      </LioonProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("dynamic-text").textContent).toBe("こんにちは");
    });
  });
});