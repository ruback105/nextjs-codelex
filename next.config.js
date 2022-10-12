const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const common = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      BASE_URL: isDev ? "http://localhost:3001" : process.env.BASE_URL,
      FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
      FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
    images: {
      domains: ["platform-lookaside.fbsbx.com"],
    },
  };

  return common;
};

module.exports = withBundleAnalyzer(nextConfig);
