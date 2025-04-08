module.exports = {
    env: {
      browser: true,
      es2021: true,
      jest: true
    },
    extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: ["import"],
    rules: {}
  };
  