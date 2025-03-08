import { type Identifier, parse } from "acorn";
import { simple } from "acorn-walk";

type TagElement = {
  template: string;
};

export function parseCode(code: string): TagElement[] {
  const ast = parse(code, { ecmaVersion: "latest", sourceType: "module" });

  const elements: TagElement[] = [];

  simple(ast, {
    TaggedTemplateExpression(node) {
      if ((node.tag as Identifier).name === "i18n") {
        elements.push({
          template: node.quasi.quasis.map((q) => q.value.raw).join("{{}}"),
        });
      }
    },
  });

  return elements;
}
