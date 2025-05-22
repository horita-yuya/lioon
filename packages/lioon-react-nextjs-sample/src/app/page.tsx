import { L18n } from "@lioon/react";

export default function Home() {
  return (
    <div>
      <L18n>Hello</L18n>
      <L18n params={[100]}>{"{{}} Count"}</L18n>
    </div>
  );
}
