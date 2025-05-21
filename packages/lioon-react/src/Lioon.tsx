"use client";

import { useLioon } from "./useLioon.ts";

export function Lioon({ children }: { children: string }) {
  const { i18n } = useLioon()
  return <>{i18n(children)}</>;
}
