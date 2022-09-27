import "../../styles/globals.css";

import { DefaultLayout, Empty } from "@/layout";
import { Layout } from "@/types/generic";

const getLayout = (layout: Layout) => {
  switch (layout) {
    case "default":
      return DefaultLayout;
    default:
      return Empty;
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
