import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { collectI18nKeys, extractI18nKey, writeTranslation } from './writeTranslation';
import * as fs from 'fs';
import * as path from 'path';

vi.mock('fs', () => ({
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

vi.mock('path', () => ({
  join: (...args: string[]) => args.join('/'),
  isAbsolute: (p: string) => p.startsWith('/'),
}));

describe('writeTranslation', () => {
  const mockOptions = {
    outputDir: '/test/i18n',
    defaultLocale: 'en',
    supportedLocales: ['en', 'ja'],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create output directory if it does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    
    writeTranslation('Hello', 'Hello', mockOptions);
    
    expect(fs.mkdirSync).toHaveBeenCalledWith('/test/i18n', { recursive: true });
  });

  it('should not create directory if it already exists', () => {
    vi.mocked(fs.existsSync).mockImplementation((path) => {
      return path === '/test/i18n';
    });
    
    writeTranslation('Hello', 'Hello', mockOptions);
    
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it('should write translation for each supported locale', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue('{}');
    
    writeTranslation('Hello', 'Hello', mockOptions);
    
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/test/i18n/en.json', 
      JSON.stringify({ Hello: 'Hello' }, null, 2),
      'utf-8'
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/test/i18n/ja.json', 
      JSON.stringify({ Hello: 'Hello' }, null, 2),
      'utf-8'
    );
  });

  it('should preserve existing translations', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockImplementation((path) => {
      if (path === '/test/i18n/en.json') {
        return JSON.stringify({ Existing: 'Value' });
      }
      return '{}';
    });
    
    writeTranslation('Hello', 'Hello', mockOptions);
    
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/test/i18n/en.json', 
      JSON.stringify({ Existing: 'Value', Hello: 'Hello' }, null, 2),
      'utf-8'
    );
  });
});

describe('extractI18nKey', () => {
  it('should extract key from template literal with variables', () => {
    const template = 'Hello, ${name}!';
    expect(extractI18nKey(template)).toBe('Hello, {{}}!');
  });

  it('should extract key from template literal with multiple variables', () => {
    const template = 'Hello, ${name}! You have ${count} messages.';
    expect(extractI18nKey(template)).toBe('Hello, {{}}! You have {{}} messages.');
  });

  it('should return template as is when no variables', () => {
    const template = 'Hello, world!';
    expect(extractI18nKey(template)).toBe('Hello, world!');
  });
});

describe('collectI18nKeys', () => {
  it('should collect i18n keys from code', () => {
    const code = `
      function Component() {
        return (
          <div>
            {i18n\`Hello\`}
            {i18n\`Welcome, \${name}\`}
          </div>
        );
      }
    `;
    expect(collectI18nKeys(code)).toEqual(['Hello', 'Welcome, {{}}']);
  });

  it('should remove duplicate keys', () => {
    const code = `
      function Component() {
        return (
          <div>
            {i18n\`Hello\`}
            {i18n\`Hello\`}
          </div>
        );
      }
    `;
    expect(collectI18nKeys(code)).toEqual(['Hello']);
  });
});