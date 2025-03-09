"use client";

import CodeExample from "@/components/code-example";
import FeatureCard from "@/components/feature-card";
import LocaleSwitcher from "@/components/locale-switcher";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "lioon-react";
import { ChevronDown, Code, Globe, Package, Zap } from "lucide-react";
import { useState } from "react";

export default function HomePage({
  onClickLocale,
}: { onClickLocale: () => void }) {
  const { i18n } = useI18n();
  const [activeTab, setActiveTab] = useState("features");

  const handleLocaleChange = () => {
    onClickLocale();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 pt-16 pb-24 px-4 md:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-border/50">
              <Globe className="h-4 w-4 text-primary" />
              <LocaleSwitcher onChange={handleLocaleChange} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {i18n`Modern Internationalization`}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {i18n`Seamlessly integrate multilingual support into your React applications with powerful, type-safe internationalization.`}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="rounded-full gap-2">
                  {i18n`Get Started`} <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full gap-2"
                >
                  {i18n`Documentation`} <Code className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border/50 shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full" />
              <CodeExample className="bg-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 px-4 py-16 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <div className="flex justify-center">
              <TabsList className="bg-muted/50 p-1 rounded-full">
                <TabsTrigger
                  value="features"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {i18n`Features`}
                </TabsTrigger>
                <TabsTrigger
                  value="examples"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {i18n`Examples`}
                </TabsTrigger>
                <TabsTrigger
                  value="documentation"
                  className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {i18n`Documentation`}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="features"
              className="space-y-12 animate-in fade-in-50"
            >
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold">{i18n`Powerful Features`}</h2>
                <p className="text-muted-foreground">
                  {i18n`Everything you need to build multilingual applications with ease.`}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Globe className="h-6 w-6 text-primary" />}
                  title={i18n`Dynamic Translation`}
                  description={i18n`Translate content on-the-fly with runtime translations that adapt to your users' needs.`}
                />
                <FeatureCard
                  icon={<Zap className="h-6 w-6 text-primary" />}
                  title={i18n`Type-Safe`}
                  description={i18n`Full TypeScript support with type inference for a robust development experience.`}
                />
                <FeatureCard
                  icon={<Package className="h-6 w-6 text-primary" />}
                  title={i18n`Zero Dependencies`}
                  description={i18n`Lightweight and efficient with no external dependencies to slow you down.`}
                />
                <FeatureCard
                  icon={<Code className="h-6 w-6 text-primary" />}
                  title={i18n`Template Literals`}
                  description={i18n`Use familiar template literals syntax for a natural translation experience.`}
                />
                <FeatureCard
                  icon={<ChevronDown className="h-6 w-6 text-primary" />}
                  title={i18n`Automatic Extraction`}
                  description={i18n`Extract translation strings directly from your code with our build plugins.`}
                />
                <FeatureCard
                  icon={<Globe className="h-6 w-6 text-primary" />}
                  title={i18n`Multiple Locales`}
                  description={i18n`Support for unlimited languages with easy switching between locales.`}
                />
              </div>
            </TabsContent>

            <TabsContent
              value="examples"
              className="space-y-8 animate-in fade-in-50"
            >
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold">{i18n`Code Examples`}</h2>
                <p className="text-muted-foreground">
                  {i18n`See how easy it is to implement internationalization in your projects.`}
                </p>
              </div>

              <div className="grid gap-8">
                <div className="bg-card rounded-xl border border-border/50 shadow-md p-6 overflow-hidden">
                  <h3 className="text-xl font-semibold mb-4">{i18n`Basic Usage`}</h3>
                  <CodeExample className="bg-muted/30" />
                </div>
                <div className="bg-card rounded-xl border border-border/50 shadow-md p-6 overflow-hidden">
                  <h3 className="text-xl font-semibold mb-4">{i18n`Dynamic Translation`}</h3>
                  <CodeExample className="bg-muted/30" />
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="documentation"
              className="space-y-8 animate-in fade-in-50"
            >
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold">{i18n`Documentation`}</h2>
                <p className="text-muted-foreground">
                  {i18n`Comprehensive guides and API references to help you get started.`}
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/50 shadow-md p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <h3>{i18n`Quick Start Guide`}</h3>
                  <p>{i18n`Get up and running with lioon-react in minutes.`}</p>
                  <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto">
                    <code>{`npm install lioon-react`}</code>
                  </pre>

                  <h4>{i18n`Basic Setup`}</h4>
                  <p>{i18n`Wrap your application with the LioonProvider and start using the useI18n hook.`}</p>

                  <Button className="mt-6">{i18n`Read Full Documentation`}</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-semibold">{i18n`lioon-react`}</span>
          </div>

          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm">{i18n`GitHub`}</Button>
            <Button variant="ghost" size="sm">{i18n`NPM`}</Button>
            <Button variant="ghost" size="sm">{i18n`Documentation`}</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
