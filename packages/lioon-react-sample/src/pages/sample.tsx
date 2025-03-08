import { useI18n } from "lioon-react";

export default function SamplePage({
  onClickLocale,
}: { onClickLocale: () => void }) {
  const { i18n } = useI18n();
  const count1 = 100;
  const count2 = "200";

  return (
    <div>
      <h1>{i18n`Sample Page`}</h1>
      <p>{i18n`Count: ${count1} and ${count2}`}</p>
      <button
        type="button"
        onClick={onClickLocale}
      >{i18n`Change Locale`}</button>
    </div>
  );
}
