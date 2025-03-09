"use client";
import { useLioon } from "@lioon/react";

export default function Home() {
  const { i18n } = useLioon();
  return <div>{i18n`hello`}</div>;
}
