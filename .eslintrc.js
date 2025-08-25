module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 14,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-compiler"],
  rules: {
    "react/style-prop-object": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-filename-extension": 0,
    "import/no-extraneous-dependencies": 0,
    "class-methods-use-this": 0,
    "no-await-in-loop": 0,
    "no-restricted-syntax": 0,
    "no-empty": 0,
    "no-useless-constructor": 0,
    "no-empty-function": 0,
    "no-nested-ternary": 0,
    "func-names": 0,
    "react-compiler/react-compiler": "error",
  },
};
