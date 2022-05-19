const withFonts = require("nextjs-fonts");

module.exports = withFonts({
  reactStrictMode: true,
  webpack(config, options) {
    return config;
  },
});
