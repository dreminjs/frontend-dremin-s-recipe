import { Html, Head, Main, NextScript } from "next/document";
import { LayoutContainer } from "@/shared";
import { Header } from "@/widgets/Header";
import { Provider } from "react-redux";
import { store } from "@/app";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
