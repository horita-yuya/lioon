"use client";

import { useLioon } from "./useLioon.ts";

export function Lioon({ children, params = [] }: { children: string, params?: (string | number)[] }) {
  const { i18n } = useLioon()
  return <>{i18n(children, ...params)}</>;
}
