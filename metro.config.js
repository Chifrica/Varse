const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts.push("png");
  config.resolver.sourceExts.push("cjs");
  config.resolver.extraNodeModules = {
    assets: require("path").resolve(__dirname + "/assets"),
  };
  return config;
})();
