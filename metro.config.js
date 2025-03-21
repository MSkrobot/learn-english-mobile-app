// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("csv");
config.resolver.assetExts.push("db");
config.resolver.assetExts.push("txt");

module.exports = config;