import { BASE_LOCALE_NAME, createI18n } from "@lioon/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLioonContext } from "./LioonProvider.tsx";

export function useLioon<Locale extends string = string>() {
  const {
    locale: contextLocale,
    dynamicTranslate,
    translations,
  } = useLioonContext();
  const locale = contextLocale ?? BASE_LOCALE_NAME;

  const [dynamicTranslations, setDynamicTranslations] = useState<
    Record<string, string>
  >({});
  const pendingTranslationsRef = useRef(new Set<string>());
  const requestInFlightRef = useRef(false);

  const dynamicI18n = useCallback(
    (text: string): string => {
      if (dynamicTranslations[text]) {
        return dynamicTranslations[text];
      }
      pendingTranslationsRef.current.add(text);
      return text;
    },
    [dynamicTranslations],
  );

  useEffect(() => {
    if (
      pendingTranslationsRef.current.size === 0 ||
      requestInFlightRef.current ||
      !dynamicTranslate
    ) {
      return;
    }

    requestInFlightRef.current = true;

    const textsToTranslate = Array.from(pendingTranslationsRef.current);
    pendingTranslationsRef.current.clear();

    dynamicTranslate(textsToTranslate)
      .then((results) => {
        setDynamicTranslations((prev) => {
          const newTranslations = { ...prev };
          for (const { original, translated } of results) {
            newTranslations[original] = translated;
          }
          return newTranslations;
        });
      })
      .finally(() => {
        requestInFlightRef.current = false;
      });
  });

  return {
    locale: locale as "base" | Locale,
    i18n: createI18n(translations, locale),
    dynamicI18n,
  };
}
