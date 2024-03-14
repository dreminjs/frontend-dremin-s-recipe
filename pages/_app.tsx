import { store } from "@/app";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { LayoutContainer } from "@/shared";
import { Header } from "@/widgets/Header";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <LayoutContainer>
          <Component {...pageProps} />
        </LayoutContainer>
      </Provider>
    </>
  );
}
