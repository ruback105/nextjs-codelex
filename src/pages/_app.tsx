import "../../styles/globals.css";

import { DefaultLayout, Empty } from "@/layout";
import { Layout, NextCustomPage } from "@/types/generic";
import { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

const getLayout = (layout: Layout) => {
  switch (layout) {
    case "default":
      return DefaultLayout;
    default:
      return Empty;
  }
};

const Auth = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session !== undefined) {
      if (!session) {
        router.replace("/signin");
      }
    }
  }, [session]);

  return children;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const { layout } = Component as NextCustomPage;

  const ComponentLayout = getLayout(layout);

  return (
    <SessionProvider session={session}>
      <Auth>
        <ComponentLayout>
          <Component {...pageProps} />
        </ComponentLayout>
      </Auth>
    </SessionProvider>
  );
}

export default MyApp;
