const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Add .cjs support
defaultConfig.resolver.sourceExts.push("cjs");

module.exports = defaultConfig;
