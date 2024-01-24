const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
// const tailwind = require("tailwindcss/lib/cli/build");

module.exports = (async () => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = getDefaultConfig(__dirname, {
    // Enable CSS support.
    isCSSEnabled: true,
  });

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg", "mjs", "cjs"],
  };

  return config;
})();
