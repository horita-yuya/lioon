import CodeBlock from "@/components/code-block.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useI18n } from "lioon-react";
import { ChevronDown, Code, Globe, Package, Zap } from "lucide-react";

export default function SamplePage({
  onClickLocale: handleLocaleChange,
}: { onClickLocale: () => void }) {
  const { locale, i18n } = useI18n();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">lioon-react</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {i18n`Features`}
            </a>
            <a
              href="#demo"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {i18n`Demo`}
            </a>
            <a
              href="#installation"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {i18n`Installation`}
            </a>
            <a
              href="#docs"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {i18n`Documentation`}
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLocaleChange}>
              <Globe className="mr-2 h-4 w-4" />
              {locale === "en" ? i18n`English` : i18n`Japanese`}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button size="sm">{i18n`Get Started`}</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  {i18n`Simple i18n for React Applications`}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {i18n`Lioon-react makes internationalization easy with a simple, template literal-based API that works seamlessly with your React components.`}
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">{i18n`Get Started`}</Button>
                  <Button variant="outline" size="lg">
                    <Code className="mr-2 h-4 w-4" />
                    {i18n`View on GitHub`}
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <CodeBlock
                  code={`import { useI18n } from "use-i18n";

function MyComponent() {
  const { i18n } = useI18n();
  const count = 42;
  
  return (
    <p>{i18n\`You have \${count} messages\`}</p>
  );
}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{i18n`Features`}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {i18n`Everything you need to internationalize your React application`}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{i18n`Simple API`}</h3>
                <p className="text-center text-muted-foreground">
                  {i18n`Use template literals for easy string interpolation and formatting`}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{i18n`Multiple Locales`}</h3>
                <p className="text-center text-muted-foreground">
                  {i18n`Support for any number of languages with easy switching`}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{i18n`Lightweight`}</h3>
                <p className="text-center text-muted-foreground">{i18n`Minimal bundle size with zero dependencies`}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {i18n`See it in action`}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {i18n`Try switching the language to see how lioon-react works`}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex justify-end mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLocaleChange}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {i18n`Change Locale`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section
          id="installation"
          className="w-full py-12 md:py-24 bg-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {i18n`Installation & Usage`}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {i18n`Get started with lioon-react in minutes`}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <Tabs defaultValue="npm">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                </TabsList>
                <TabsContent value="npm" className="mt-4">
                  <div className="rounded-lg bg-muted p-4">
                    <code className="text-sm font-mono">
                      npm install lioon-react
                    </code>
                  </div>
                </TabsContent>
                <TabsContent value="yarn" className="mt-4">
                  <div className="rounded-lg bg-muted p-4">
                    <code className="text-sm font-mono">
                      yarn add lioon-react
                    </code>
                  </div>
                </TabsContent>
                <TabsContent value="pnpm" className="mt-4">
                  <div className="rounded-lg bg-muted p-4">
                    <code className="text-sm font-mono">
                      pnpm add lioon-react
                    </code>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">{i18n`1. Set up the provider`}</h3>
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <CodeBlock
                      code={`import { I18nProvider } from 'use-i18n';

const messages = {
  en: {
    'Sample Page': 'Sample Page',
    'Count: {0} and {1}': 'Count: {0} and {1}',
    'Change Locale': 'Change Locale'
  },
  ja: {
    'Sample Page': 'サンプルページ',
    'Count: {0} and {1}': 'カウント: {0}と{1}',
    'Change Locale': '言語を変更'
  }
};

function App() {
  return (
    <I18nProvider defaultLocale="en" messages={messages}>
      <YourApp />
    </I18nProvider>
  );
}`}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">{i18n`2. Use in your components`}</h3>
                  <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <CodeBlock
                      code={`import { useI18n } from 'use-i18n';

function MyComponent() {
  const { i18n } = useI18n();
  const count = 42;
  
  return (
    <div>
      <p>{i18n\`Count: \${count} and \${'200'}\`}</p>
      <button onClick={() => {
        // Change the locale
      }}}>
        {i18n\`Change Locale\`}
      </button>
    </div>
  );
}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 lioon-react. {i18n`All rights reserved.`}
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              npm
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {i18n`Documentation`}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
