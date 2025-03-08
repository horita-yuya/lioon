# lioon

A lightweight, type-safe internationalization (i18n) library for React applications with a simple template literal-based API.

## Features

- **Simple API**: Use template literals for easy string interpolation and formatting
- **Type-safe**: Full TypeScript support with type inference
- **Multiple Locales**: Support for any number of languages with easy switching
- **Automatic Extraction**: Vite plugin to extract i18n keys from source code
- **Dynamic Translation**: Support for both static and runtime translation
- **Zero Dependencies**: Minimal bundle size for production

## Packages

The lioon project consists of two main packages:

- `lioon-core`: Core internationalization functionality
- `lioon-react`: React integration with hooks and components

## Installation

```bash
# npm
npm install lioon-react

# yarn
yarn add lioon-react

# pnpm
pnpm add lioon-react
```

## Usage

### Basic Setup

Set up the `I18nProvider` at the root of your application:

```tsx
import { I18nProvider } from 'lioon-react';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

function App() {
  const [locale, setLocale] = useState<"en" | "ja">("en");
  
  return (
    <I18nProvider translations={{ en, ja }} locale={locale}>
      <YourApp />
    </I18nProvider>
  );
}
```

### Using the `useI18n` Hook

```tsx
import { useI18n } from 'lioon-react';

function MyComponent() {
  const { i18n, locale } = useI18n();
  const count = 42;
  
  return (
    <div>
      <h1>{i18n`Hello`}</h1>
      <p>{i18n`You have ${count} messages`}</p>
      <button onClick={() => toggleLocale()}>
        {locale === "en" ? i18n`English` : i18n`Japanese`}
      </button>
    </div>
  );
}
```

### Translation File Format

The translation files follow a simple JSON format:

```json
// en.json
{
  "Hello": "Hello",
  "You have {{}} messages": "You have {{}} messages",
  "English": "English",
  "Japanese": "Japanese"
}

// ja.json
{
  "Hello": "こんにちは",
  "You have {{}} messages": "{{}}件のメッセージがあります",
  "English": "英語",
  "Japanese": "日本語"
}
```

## Vite Plugin

lioon comes with a Vite plugin for automatic extraction of i18n keys from your source code:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import lioonVitePlugin from 'lioon-react/vite';

export default defineConfig({
  plugins: [
    react(),
    lioonVitePlugin({
      outputDir: 'src/i18n',
      supportedLocales: ['en', 'ja'],
      // Optional: Translate function for automatic translation
      translate: async (templates) => {
        // Implement your translation logic here
        // Return array of [template, { locale: translation }]
      }
    })
  ]
});
```

## Advanced Usage

### Dynamic Translation

For runtime translation of content:

```tsx
import { useI18n, DynamicI18n } from 'lioon-react';

function MessageDisplay({ message }) {
  const { i18n, dynamicI18n } = useI18n();
  
  return (
    <div>
      <p>{i18n`Nice to meet you, ${dynamicI18n(user.name)}`}</p>
      
      {/* Using the DynamicI18n component */}
      <DynamicI18n render={<p />}>
        {message}
      </DynamicI18n>
    </div>
  );
}
```

## Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/lioon.git
cd lioon
pnpm install
```

Run tests:

```bash
pnpm test
```

Run the sample application:

```bash
pnpm dev:react
```

## License

[MIT](LICENSE)
