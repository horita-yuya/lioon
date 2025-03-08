import { describe, it, expect, vi, beforeEach } from 'vitest';
import lioonVitePlugin from './index';
import * as writeTranslationModule from 'lioon-core/src/writeTranslation';

// Mock lioon-core dependencies
vi.mock('lioon-core/src/writeTranslation', () => ({
  collectI18nKeys: vi.fn(),
  writeTranslation: vi.fn(),
}));

describe('lioonVitePlugin', () => {
  let plugin: ReturnType<typeof lioonVitePlugin>;

  beforeEach(() => {
    vi.resetAllMocks();
    plugin = lioonVitePlugin() as any;
  });

  it('should be named correctly', () => {
    expect(plugin.name).toBe('vite-plugin-lioon');
  });

  it('should skip non-JS/TS files', async () => {
    const result = await plugin.transform?.('const a = 1;', 'file.css');
    expect(result).toBeUndefined();
    expect(writeTranslationModule.collectI18nKeys).not.toHaveBeenCalled();
  });

  it('should process JS/TS/JSX/TSX files', async () => {
    vi.mocked(writeTranslationModule.collectI18nKeys).mockReturnValue(['Hello']);

    const fileTypes = ['file.js', 'file.ts', 'file.jsx', 'file.tsx'];
    
    for (const file of fileTypes) {
      await plugin.transform?.('const a = i18n`Hello`;', file);
      
      expect(writeTranslationModule.collectI18nKeys).toHaveBeenCalledWith('const a = i18n`Hello`;');
      expect(writeTranslationModule.writeTranslation).toHaveBeenCalledWith(
        'Hello',
        'Hello',
        expect.objectContaining({
          outputDir: expect.any(String),
          defaultLocale: 'en',
          supportedLocales: ['en']
        })
      );
      
      vi.clearAllMocks();
    }
  });

  it('should use custom options when provided', async () => {
    vi.mocked(writeTranslationModule.collectI18nKeys).mockReturnValue(['Hello']);

    const customPlugin = lioonVitePlugin({
      outputDir: 'custom/i18n',
      defaultLocale: 'ja',
      supportedLocales: ['en', 'ja', 'ko'],
    }) as any;
    
    await customPlugin.transform?.('const a = i18n`Hello`;', 'file.tsx');
    
    expect(writeTranslationModule.writeTranslation).toHaveBeenCalledWith(
      'Hello',
      'Hello',
      expect.objectContaining({
        outputDir: expect.stringContaining('custom/i18n'),
        defaultLocale: 'ja',
        supportedLocales: ['en', 'ja', 'ko']
      })
    );
  });
});