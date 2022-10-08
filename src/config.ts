const config = {
  mongoUri: process.env.MONGODB_URI,
  baseUrl: process.env.BASE_URL,
  saltRounds: 10,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
};

export default config;
