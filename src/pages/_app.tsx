import "../../styles/globals.css";

import { DefaultLayout, Empty } from "@/layout";
import { Layout, NextCustomPage } from "@/types/generic";
import { AppProps } from "next/app";

const getLayout = (layout: Layout) => {
  switch (layout) {
    case "default":
      return DefaultLayout;
    default:
      return Empty;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const { layout } = Component as NextCustomPage;
  
  const ComponentLayout = getLayout(layout);

  return (
    <ComponentLayout>
      <Component {...pageProps} />
    </ComponentLayout>
  );
}

export default MyApp;
