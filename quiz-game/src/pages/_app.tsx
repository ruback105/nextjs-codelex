import "../../styles/globals.css";

import { DefaultLayout } from "@/layout";
import { Layout } from "@/types/generic";

const getLayout = (layout: Layout) => {
  switch (layout) {
    default:
      return DefaultLayout;
  }
};

function MyApp({ Component, pageProps }) {
  const ComponentLayout = getLayout(Component.layout);

  return (
    <ComponentLayout>
      <Component {...pageProps} />
    </ComponentLayout>
  );
}

export default MyApp;
