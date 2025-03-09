import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import lioonVitePlugin from "./index";

vi.mock("@lioon/core", () => ({
  parseCode: vi.fn().mockReturnValue([
    { template: "Hello" },
    { template: "Welcome to Lioon" }
  ])
}));

vi.mock("@lioon/core/plugin", () => ({
  writeTranslation: vi.fn()
}));

vi.mock("node:fs", () => ({
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn()
}));

vi.mock("node:path", () => ({
  isAbsolute: vi.fn(),
  join: vi.fn(),
  relative: vi.fn().mockReturnValue("test/file.tsx")
}));

describe("lioonVitePlugin", () => {
  const mockConsoleLog = vi.spyOn(console, "log");
  
  beforeEach(() => {
    vi.clearAllMocks();
    path.isAbsolute = vi.fn().mockReturnValue(false);
    path.join = vi.fn().mockReturnValue("/mocked/output/dir");
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("transforms code and calls staticTranslate", async () => {
    const mockStaticTranslate = vi.fn().mockResolvedValue([
      ["Hello", { en: "Hello", ja: "こんにちは" }],
      ["Welcome to Lioon", { en: "Welcome to Lioon", ja: "Lioonへようこそ" }]
    ]);

    const plugin = lioonVitePlugin({
      outputDir: "src/i18n",
      supportedLocales: ["en", "ja"],
      staticTranslate: mockStaticTranslate
    });

    const code = `
      function Sample() {
        const { i18n } = useLioon();
        return <div>{i18n\`Hello\`}</div>;
      }
    `;

    const result = await plugin.transform(code, "test/file.tsx");

    expect(result).toBe(code);
    expect(mockStaticTranslate).toHaveBeenCalledWith(["Hello", "Welcome to Lioon"]);
    expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining("[lioon] Extracted 2 i18n keys"));
  });

  it("skips non JavaScript/TypeScript files", async () => {
    const plugin = lioonVitePlugin({
      outputDir: "src/i18n",
      supportedLocales: ["en", "ja"]
    });

    const code = "Some content";
    const result = await plugin.transform(code, "test/file.css");

    expect(result).toBe(code);
    expect(console.log).not.toHaveBeenCalled();
  });

  it("uses default templates when staticTranslate is not provided", async () => {
    const { writeTranslation } = await import("@lioon/core/plugin");
    
    const plugin = lioonVitePlugin({
      outputDir: "src/i18n",
      supportedLocales: ["en", "ja"]
    });

    await plugin.transform("code", "test/file.tsx");

    expect(writeTranslation).toHaveBeenCalled();
    const call = (writeTranslation as any).mock.calls[0][1];
    expect(call).toEqual([
      ["Hello", { en: "", ja: "", base: "Hello" }],
      ["Welcome to Lioon", { en: "", ja: "", base: "Welcome to Lioon" }]
    ]);
  });
});