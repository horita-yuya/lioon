import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "lioon-react";

export default function CodeExample() {
  const { i18n } = useI18n();

  const basicExample = `import { useI18n } from "lioon-react";

function Greeting() {
  const { i18n } = useI18n();
  const name = "Lioon";
  
  return (
    <div>
      <h1>{i18n\`Hello\`}</h1>
      <p>{i18n\`Welcome to \${name}\`}</p>
    </div>
  );
}`;

  const dynamicExample = `import { useI18n, DynamicI18n } from "lioon-react";

function UserGreeting() {
  const { i18n, dynamicI18n } = useI18n();
  const user = { name: "Alex" };
  const message = getMessage();
  
  return (
    <div>
      <p>{i18n\`Nice to meet you, \${dynamicI18n(user.name)}\`}</p>
      <DynamicI18n render={<p/>}>
        {message}
      </DynamicI18n>
    </div>
  );
}`;

  const providerExample = `import { LioonProvider } from "lioon-react";

function App() {
  return (
    <LioonProvider 
      locale="ja"
      supportedLocales={["en", "ja", "ko"]}
      translateI18n={async (text) => {
        return await fetch(\`/api/translate?text=\${text}\`)
          .then(res => res.json());
      }}
    >
      <YourApp />
    </LioonProvider>
  );
}`;

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">{i18n`Basic Usage`}</TabsTrigger>
            <TabsTrigger value="dynamic">{i18n`Dynamic Translation`}</TabsTrigger>
            <TabsTrigger value="provider">{i18n`Provider Setup`}</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
              <code>{basicExample}</code>
            </pre>
          </TabsContent>
          <TabsContent value="dynamic">
            <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
              <code>{dynamicExample}</code>
            </pre>
          </TabsContent>
          <TabsContent value="provider">
            <pre className="rounded-lg bg-muted p-4 overflow-x-auto text-sm">
              <code>{providerExample}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
