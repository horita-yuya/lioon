import {
  BASE_LOCALE_NAME,
  createI18n,
} from "@lioon/core";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLioonContext } from "./LioonProvider";

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

  const registerTemplate = useInternalLioon()

  return {
    locale: locale as "base" | Locale,
    i18n: createI18n(translations, locale, registerTemplate),
    dynamicI18n,
  };
}

function useInternalLioon(): (template: string) => void {
  return useCallback(async (template) => {
    if (typeof window !== "undefined") return;

    const outputDir = process.env.LIOON_OUTPUT_DIR;

    if (outputDir) {
      const supportedLocales = process.env.LIOON_LOCALES?.split(",").map(locale => locale.trim()) || [];
      const tools = await import("@lioon/core/plugin");
      tools.writeTranslation(outputDir, supportedLocales.map(locale => ([
        template, {
          [locale]: template,
        }
      ])))
    }
  }, [])
}
