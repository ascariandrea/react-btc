module.exports = {
  root: true,
  extends: [
    "standard-with-typescript",
    "plugin:import/typescript",
    "plugin:import/recommended",
    "prettier",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],

  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
    react: {
      version: "18.2.0",
    },
  },
  rules: {
    "react/prop-types": ["off"],
    "@typescript-eslint/no-unnecessary-type-assertion": ["off"],
    "@typescript-eslint/no-redeclare": ["off"]
  },
};
