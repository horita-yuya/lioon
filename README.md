# lioon

![Lioon logo](lioon.png)

A lightweight, type-safe internationalization (i18n) library for React applications with a simple template literal-based API.

https://lioon.dev/

## Features

- **Simple API**: Use template literals for easy string interpolation and formatting
- **Type-safe**: Full TypeScript support with type inference
- **Multiple Locales**: Support for any number of languages with easy switching
- **Automatic Extraction**: Vite plugin to extract i18n keys from source code
- **Dynamic Translation**: Support for both static and runtime translation
- **Zero Dependencies**: Minimal bundle size for production
- **NPM Provenance**: Verified source and build integrity

## Packages

The lioon project consists of two main packages:

- `@lioon/core`: Core internationalization functionality
- `@lioon/react`: React integration with hooks and components

## Installation

```bash
# npm
npm install @lioon/react

# yarn
yarn add @lioon/react

# pnpm
pnpm add @lioon/react
```

## Usage

### Basic Setup

Set up the `LioonProvider` at the root of your application:

```tsx
import { LioonProvider } from '@lioon/react';
import en from './i18n/en.json';
import ja from './i18n/ja.json';

function App() {
  const [locale, setLocale] = useState<"en" | "ja">("en");
  
  return (
    <LioonProvider 
      locale={locale} 
      supportedLocales={["en", "ja"]}
      translateI18n={async (text) => {
        return await fetch(`/api/translate?text=${text}`)
          .then(res => res.json());
      }}
    >
      <YourApp />
    </LioonProvider>
  );
}
```

### Using the `useLioon` Hook

```tsx
import { useLioon } from '@lioon/react';

function Greeting() {
  const { i18n } = useLioon();
  const name = "Lioon";
  
  return (
    <div>
      <h1>{i18n`Hello`}</h1>
      <p>{i18n`Welcome to ${name}`}</p>
    </div>
  );
}
```

### Dynamic Translation

For runtime translation of dynamic content:

```tsx
import { useLioon, DynamicI18n } from '@lioon/react';

function UserGreeting() {
  const { i18n, dynamicI18n } = useLioon();
  const user = { name: "Alex" };
  const message = getMessage();
  
  return (
    <div>
      <p>{i18n`Nice to meet you, ${dynamicI18n(user.name)}`}</p>
      
      <DynamicI18n render={<p/>}>
        {message}
      </DynamicI18n>
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
  "Welcome to {{}}": "Welcome to {{}}",
  "Nice to meet you, {{}}": "Nice to meet you, {{}}"
}

// ja.json
{
  "Hello": "こんにちは",
  "Welcome to {{}}": "{{}}へようこそ",
  "Nice to meet you, {{}}": "{{}}さん、はじめまして"
}
```

## Vite Plugin

lioon comes with a Vite plugin for automatic extraction of i18n keys from your source code:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import lioonVitePlugin from '@lioon/react/vite';

export default defineConfig({
  plugins: [
    react(),
    lioonVitePlugin({
      outputDir: 'src/i18n',
      supportedLocales: ['en', 'ja', 'ko', 'zh', 'es'],
      translate: async (templates) => {
        // Optional: Implement your translation logic here
        return templates.map((template) => {
          return [template, { 
            en: template, 
            ja: template, 
            ko: template, 
            zh: template, 
            es: template 
          }];
        });
      }
    })
  ]
});
```

## Building from Source

The project uses pnpm workspaces. To build from source:

```bash
# Clone the repository
git clone https://github.com/horita-yuya/lioon.git
cd lioon

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build all packages
pnpm -r build

# Run the sample application
cd packages/lioon-react-sample
pnpm dev
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

[MIT](LICENSE)
