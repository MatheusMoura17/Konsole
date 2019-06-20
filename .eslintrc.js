module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      tsx: true
    }
  },
  rules: {
    prettier: true,
    semi: "error",
    "explicit-function-return-type": "false",
    // Usar regras do Prettier através do TSLint
    prettier: true,
    // Permite usar "import React..." ter que usar "import * as React..."
    "import-name": false,
    // Permite variáveis (componentes de função) começando com letra maiúscula
    "variable-name": false,
    // Remove a parte "={true}" em props
    "jsx-boolean-value": [true, "never"],
    // Remove warning no console
    "no-boolean-literal-compare": false,
    // Remove conflito com ordem alfabética
    "object-shorthand-properties-first": false
  }
};
