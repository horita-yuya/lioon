import { useI18n } from "lioon-react";

export default function SamplePage() {
  const { i18n } = useI18n();
  return (
    <div>
      <h1>{i18n`Sample Page`}</h1>
    </div>
  );
}
