// gatsby-config.js
const { useGatsbyConfig } = require("gatsby-plugin-ts-config");

// For static analysis purposes, you can use a callback with a require() statement

module.exports = useGatsbyConfig(() => require("./gatsby-config.ts"), {});
