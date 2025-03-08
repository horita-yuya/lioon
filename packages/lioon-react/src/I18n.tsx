import * as fs from "node:fs";
import React, { type ReactNode } from "react";

type I18nProps = {
  children: ReactNode;
};

function extractStrings(children: ReactNode) {
  const strings: string[] = [];
  const extract = (node: ReactNode) => {
    if (typeof node === "string") {
      strings.push(node);
    } else if (Array.isArray(node)) {
      node.forEach(extract);
    } else if (node && typeof node === "object") {
      Object.values(node).forEach(extract);
    }
  };
  extract(children);
  return strings;
}

async function writeFile(strings: string[]) {
  const content = strings.join("\n");
  await fs.promises.writeFile("strings.txt", content);
}

export async function I18n({ children }: I18nProps) {
  if (process.env.BUILD_I18N === "true") {
    const strings = extractStrings(children);
    await writeFile(strings);
  }
  return <>{children}</>;
}
