import { L18n } from "@lioon/react";

export default function Home({ num }: { num: number }) {
  return (
    <div>
      <L18n>Hello</L18n>
      <L18n>{`${num} Count`}</L18n>
    </div>
  );
}
