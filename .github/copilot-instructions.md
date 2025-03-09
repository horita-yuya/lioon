# You
You are professional typescript engineer. Also, you are multilingual.

# Principles
- Don't use any, instead type inferrence or restrict type.
- Don't write any comments.
- Use git command to grasp project structure efficiently.
- Read package.json to grasp scripts and dependencies.
- Don't import entire, like import * as i18Module. Instead, import each components, like import { i18n }.

# lioon API design

lioon API has three main components, useI18n, DynamicI18n, and LioonProvider.

- useI18n: Hook to get i18n and dynamicI18n functions.
  - i18n: Function to translate static string.
    - read mode (default): return if translation exists, otherwise return original string.
    - write mode: write texts into translation file.
  - dynamicI18n: Function to translate string dynamically, or in runtime.
    - send requests to server to get translation.
- DynamicI18n: Component to translate string dynamically.
  - render: React component to render translated string.
- LioonProvider: Provider to set locale.
  - locale: Current locale.
  - supportedLocales: Supported locales.
  - translateI18n: Function to translate string.
    - send requests to server to get translation.
    - Used by dynamicI18n and i18n in build mode.

```typescript jsx
import { useI18n, DynamicI18n } from "./index";

function Sample() {
  const { i18n, dynamicI18n } = useI18n()
  const name = "Lioon"
  const me = useMe()
  const message = useMessage()

  return (
    <div>
      <h1>
        {/* Static Translation */}
        {i18n`Hello`}
      </h1>
      <p>
        {/* Static Translation with variables */}
        {i18n`Welcome to ${name}`}
      </p>
      <p>
        {i18n`Nice to meet you, ${dynamicI18n(me.name)}`}
      </p>
      {/* Same as <p>{dynamicI18n(message)}</p> */}
      <DynamicI18n render={<p/>}>
        {message}
      </DynamicI18n>
      <button>
        {i18n`Click me`}
      </button>
    </div>
  )
}

// static i18n file format
// default.json
//  {
//    "Hello": "Hello",
//    "Welcome to Lioon": "Welcome to Lioon",
//    "Nice to meet you, {{}}": "Nice to meet you, {{}}"
//  }
//  
//  ja.json
//  {
//    "Hello": "こんにちは",
//    "Welcome to Lioon": "Lioonへようこそ",
//    "Nice to meet you, {{}}": "{{}}}さん、はじめまして"
//  }

function App() {
  return (
    <LioonProvider 
      locale="ja"
      supportedLocales={["en", "ja"]}
      dynamicTranslate={async (text: string) => {
        return await fetch(`/api/translate?text=${text}`).then(res => res.json()) as { text: string, translated: string }
      }}
    >
      <Sample/>
    </LioonProvider>
  )
}
```

# Plugins
This plugin extracts i18n strings from source code and writes them into i18n files.

## Vite
```typescript
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    lioonVitePlugin({
      outputDir: "src/i18n",
      supportedLocales: ["en", "ja", "ko", "zh", "es"],
      staticTranslate: async (templates) => {
        return templates.map((template) => {
          return [template, { en: template, ja: template, ko: template, zh: template, es: template }]
        })
      },
    }),
  ],
})
```

# Testing
- Use vitest
- Create test file, as sibling of target file, like i18n.spec.ts.
