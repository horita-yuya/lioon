import { type ReactElement, cloneElement } from "react";
import { useLioon } from "./useLioon";

type DynamicI18nProps = {
  children: string;
  render: ReactElement;
};

export function DynamicI18n({
  children,
  render,
}: DynamicI18nProps): ReactElement {
  const { dynamicI18n } = useLioon();
  const translatedText = dynamicI18n(children);

  return cloneElement(render, render.props, translatedText);
}
