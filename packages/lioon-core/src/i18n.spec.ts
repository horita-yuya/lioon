import { describe, expect, it } from 'vitest';
import { createI18n, type TranslationDict } from './i18n';

describe('i18n', () => {
  it('should return original text when no translation is available', () => {
    const i18n = createI18n();
    const result = i18n`Hello, World!`;
    expect(result).toBe('Hello, World!');
  });

  it('should format strings with interpolated values', () => {
    const i18n = createI18n();
    const count = 3;
    const result = i18n`There are ${count} trees`;
    expect(result).toBe('There are 3 trees');
  });

  it('should return translated text when translation is available', () => {
    const translations: TranslationDict = {
      'TestComponentHello, World!': {
        en: 'Hello, World!',
        ja: 'こんにちは、世界！',
      },
      'TestComponentThere are {{}} trees': {
        en: 'There are {{}} trees',
        ja: '木が {{}} 本あります',
      },
    };

    const i18n = createI18n({
      translations,
      locale: 'ja',
      componentName: 'TestComponent',
    });

    expect(i18n`Hello, World!`).toBe('こんにちは、世界！');
    
    const count = 3;
    expect(i18n`There are ${count} trees`).toBe('木が 3 本あります');
  });

  it('should fallback to default locale if translation not found in current locale', () => {
    const translations: TranslationDict = {
      'TestComponentHello, World!': {
        ja: 'こんにちは、世界！',
      },
    };

    const i18n = createI18n({
      translations,
      locale: 'fr',
      defaultLocale: 'ja',
      componentName: 'TestComponent',
    });

    expect(i18n`Hello, World!`).toBe('こんにちは、世界！');
  });

  it('should handle multiple interpolated values correctly', () => {
    const translations: TranslationDict = {
      'TestComponentUser ${} has ${} points and ${} medals': {
        en: 'User {{}} has {{}} points and {{}} medals',
        ja: 'ユーザー {{}} は {{}} ポイントと {{}} 個のメダルを持っています',
      },
    };

    const i18n = createI18n({
      translations,
      locale: 'ja',
      componentName: 'TestComponent',
    });

    const user = 'Alice';
    const points = 100;
    const medals = 5;
    
    expect(i18n`User ${user} has ${points} points and ${medals} medals`)
      .toBe('ユーザー Alice は 100 ポイントと 5 個のメダルを持っています');
  });

  it('should collect translations in build mode', () => {
    const i18n = createI18n({
      isBuildMode: true,
      componentName: 'BuildComponent',
    });

    const result = i18n`Hello, World!`;
    expect(result).toBe('Hello, World!');
  });
});