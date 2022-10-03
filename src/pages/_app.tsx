import "../../styles/globals.css";

import { DefaultLayout, Empty } from "@/layout";
import { Layout, NextCustomPage } from "@/types/generic";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const getLayout = (layout: Layout) => {
  switch (layout) {
    case "default":
      return DefaultLayout;
    default:
      return Empty;
  }
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  const { layout } = Component as NextCustomPage;

  const ComponentLayout = getLayout(layout);

  return (
    <ComponentLayout>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ComponentLayout>
  );
}

export default MyApp;
