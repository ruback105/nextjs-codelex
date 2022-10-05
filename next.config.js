const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const common = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      BASE_URL: isDev ? "http://localhost:3000" : process.env.BASE_URL,
    },
    images: {
      domains: ["platform-lookaside.fbsbx.com"],
    },
  };

  return common;
};

module.exports = nextConfig;
