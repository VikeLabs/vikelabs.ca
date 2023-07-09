module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:testing-library/react",
    "next/core-web-vitals",
    "next",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  rules: {
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/no-unescaped-entities": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-namespace": "off",
    semi: "off",
    quotes: [
      2,
      "double",
      {
        avoidEscape: true,
      },
    ],
    indent: ["error", 2, { SwitchCase: 1 }],
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        semi: true,
        singleQuote: false,
        printWidth: 100,
      },
    ],
  },
};
